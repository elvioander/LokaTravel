import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { signInSchema } from "./lib/zod";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      // This authorize method which basically gives you access to credentials that user has past when they were trying to log into your application.
      async authorize(credentials) {
        // Only way a login becomes successful when we return a user object from this authorized callback. For all other scenarios, we can return null which means something is wrong.

        let user = null;

        // validate credentials
        const parsedCredentials = signInSchema.safeParse(credentials);
        if (!parsedCredentials.success) {
          console.error("Invalid credentials:", parsedCredentials.error.errors);
          return null;
        }

        // get user

        user = {
          id: "1",
          name: "Elvio Andersoon",
          email: "elvioander@gmail.com",
        };

        if (!user) {
          console.log("Invalid credentials");
          return null;
        }

        return user;
      },
    }),
  ],
});
