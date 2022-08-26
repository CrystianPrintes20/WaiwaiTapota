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
        console.log(credentials);
        const user = await axios.post(
          "https://6293a9127aa3e6af1a0f11cb.mockapi.io/api/login",
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
          console.log("User:", user.data);
          return user.data;
        } else {
          return null;
        }
      },
    }),
  ],
  secret: "teste",

  session: {
    strategy: "jwt",
  },

  // https://next-auth.js.org/configuration/options#jwt
  jwt: {
    // A secret to use for key generation (you should set this explicitly)
     secret: "teste",
    // Set to true to use encryption (default: false)
    // encryption: true,
    // You can define your own encode/decode functions for signing and encryption
    // if you want to override the default behaviour.
    // encode: async ({ secret, token, maxAge }) => {},
    // decode: async ({ secret, token, maxAge }) => {},
  },
  callbacks: {
   
    async session({ session, user, token }) {
      return session
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      return token
    }
 },

  /* callbacks: {
    async jwt({ token, user, account, profile, isNewUser }) {
      console.log(user);
      if (user) {
        token = user.email;
      }
      console.log(token);
      return token;
    },     async session(session, token) {
      console.log(session);
      session.accessToken = token;
      console.log(session.accessToken);
      return session;
    },
  }, */
 /*  session: {
    strategy: "jwt",
  }, */
  pages: {
    error: "/auth/loginformik",
  },
};

export default (req, res) => NextAuth(req, res, options);
