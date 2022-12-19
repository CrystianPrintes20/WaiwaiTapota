/* eslint-disable import/no-anonymous-default-export */
import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
const options = {
  providers: [
    /*  GitHubProvider({
             clientId: process.env.GITHUB_ID,
             clientSecret: process.env.GITHUB_SECRET
         }),
         GoogleProvider({
             clientId: process.env.GOOGLE_ID,
             clientSecret: process.env.GOOGLE_SECRET,
         }), */
    CredentialsProvider({
      name: "credentials",
      authorize: async (credentials) => {
        const user = await axios.post(
          "http://localhost:5000/login",
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

        if (user) {
          console.log("User:", user.data.access_token);
          return {
          token: user.data.access_token
          }  
        } else {
          return null;
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
      session.user = token.user;  // Setting token in session
      return session;
    },
  },
  // pages: {
  //   error: "/auth/loginformik",
  // },
};

export default (req, res) => NextAuth(req, res, options);
