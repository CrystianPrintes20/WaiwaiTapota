// /* eslint-disable import/no-anonymous-default-export */
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import cookie from "cookie";
import { AuthToken } from "../../../src/services/auth";

export default (req, res) => {
  // https://github.com/nextauthjs/next-auth/discussions/4428
  // https://github.com/vercel/next.js/discussions/22363
  return NextAuth(req, res, {
    providers: [
      CredentialsProvider({
        name: "credentials",
        authorize: async (credentials) => {
          try {
            const { data } = await axios.post(
              "http://localhost:5000/auth/login",
              {
                email: credentials.email,
                password: credentials.password,
              },
              {
                headers: {
                  accept: "*/*",
                  "Content-Type": "application/json",
                },
              }
            );

            const authAccess = new AuthToken(data.access_token);
            const authRefresh = new AuthToken(data.refresh_token);


            const accessToken = cookie.serialize(
              "accessToken",
              data.access_token,
              {
                maxAge: authAccess.getExp,
                httpOnly: true,
                path: "/",
              }
            );
            const refreshToken = cookie.serialize(
              "refreshToken",
              data.refresh_token,
              {
                maxAge: authRefresh.getExp,
                httpOnly: true,
                path: "/",
              }
            );
            // Adicionando tempo para Token expirar no cabeçalho
            // https://github.com/vercel/next.js/issues/16764#issuecomment-685440101
            res.setHeader("Set-Cookie", [accessToken, refreshToken]);
            return {
              email: authAccess.getEmail,
              username: authAccess.getUsername,
            };
          } catch (error) {
            console.log(error);
            throw Error(error.response);
          }
        },
      }),
    ],
    callbacks: {
      jwt: async ({ token, user }) => {
        user && (token.user = user);
        return token;
      },
      session: async ({ session, token }) => {
        // Todo: Cada vez que o usuário fizer login verificar se Token existe; Validar se token ainda está válido; Renovar Token; Se nada, logout
        session.user = token.user; // Setting token in session
        return session;
      },
    },
  });
};
