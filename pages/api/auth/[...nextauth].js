// /* eslint-disable import/no-anonymous-default-export */
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import cookie from "cookie";
import { TokenDecoder } from "../../../src/services/decoder";
import { WaiwaiAuthentication } from "../../../src/services/waiwaitapota";

const auth = (req, res) => {
  // https://github.com/nextauthjs/next-auth/discussions/4428
  // https://github.com/vercel/next.js/discussions/22363
  return NextAuth(req, res, {
    session: {
      maxAge: 30 * 24 * 60 * 60, // 30 days login
      updateAge: 4 * 60 * 60 + 50 * 60, // 4 hours and 50 minutes to update
    },
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
            /**
             * TODO: Verificar se Tokens já existem no cabeçalho;
             */

            const authAccess = new TokenDecoder(data.access_token);
            const authRefresh = new TokenDecoder(data.refresh_token);
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
      jwt: async (jwt) => {
        let objCookies = req.cookies;
        const authAccess = new TokenDecoder(objCookies.accessToken);
        const authRefresh = new TokenDecoder(objCookies.refreshToken);

        const { token, user } = jwt;
        if (user) {
          token.user = user;
        }
        if (!authAccess.isExpired) {
          /**
           * Referências:
           * https://next-auth.js.org/tutorials/refresh-token-rotation
           * https://next-auth.js.org/configuration/callbacks
           *
           * Toda vez que usuário entrar na sessão vai verificar se o Token Expirou, caso sim, renova
           * TODO: Verificar porque são feitas 3 requisições para o servidor
           */
          const renewer = new WaiwaiAuthentication(
            authAccess.token,
            authRefresh.token
          );
          const newAccesToken = await renewer.refreshAccess();
          const accessTokenRefreshed = cookie.serialize(
            "accessToken",
            newAccesToken,
            {
              maxAge: authAccess.getExp,
              httpOnly: true,
              path: "/",
            }
          );
          res.setHeader("Set-Cookie", [accessTokenRefreshed]);
        }
        return token;
      },
      session: async ({ session, token }) => {
        session.user = token.user;
        return session;
      },
    },
    events: {
      async signOut(message) {
        /**
         * TODO: Invalidar tokens do lado da API
         */
        const accessToken = cookie.serialize("accessToken", "", {
          maxAge: 0,
          path: "/",
        });
        const refreshToken = cookie.serialize("refreshToken", "", {
          maxAge: 0,
          path: "/",
        });
        res.setHeader("Set-Cookie", [accessToken, refreshToken]);
      },
    },
  });
};
export default auth;
