import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import dbConnect from "lib/dbConnect";
import User from "models/User";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      async authorize(credentials, req) {
        try {
          await dbConnect();
          const user = await User.findOne({ email: credentials?.email });

          if (!user) {
            throw new Error("Sorry, invalid credentials");
          }

          const isMatch = await bcrypt.compare(
            credentials?.password,
            user?.password
          );

          if (!isMatch) {
            throw new Error("Sorry, invalid credentials");
          }

          return user;
        } catch (error) {
          const errorMessage = error?.message;
          throw new Error(`${errorMessage}&email=${credentials?.email}`);
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token, user }) {
      if (token) {
        session.user = token.user;
      }

      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        token.user = user;
      }

      return token;
    },
  },
  session: {
    maxAge: 432000,
  },
  pages: {
    signIn: "/securelogin",
    signOut: "/",
    error: "/securelogin",
  },
});
