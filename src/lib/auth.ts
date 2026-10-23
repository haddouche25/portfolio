import CredentialsProvider from "next-auth/providers/credentials";
import crypto from "crypto";
import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Admin Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const submittedEmail = credentials?.email?.trim().toLowerCase();
        const submittedPassword = credentials?.password?.trim() || "";
        const expectedEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
        const expectedHash = process.env.ADMIN_PASSWORD_HASH?.trim() || "";

        if (
          !submittedEmail ||
          !submittedPassword ||
          !expectedEmail ||
          !expectedHash
        ) {
          return null;
        }

        if (submittedEmail !== expectedEmail) {
          return null;
        }

        const computedHash = crypto
          .createHash("sha256")
          .update(submittedPassword)
          .digest("hex");

        const isValid =
          computedHash.length === expectedHash.length &&
          crypto.timingSafeEqual(
            Buffer.from(computedHash),
            Buffer.from(expectedHash),
          );

        if (!isValid) {
          return null;
        }

        return {
          id: "admin-1",
          name: "Mohamed",
          email: expectedEmail,
          role: "admin",
        };
      },
    }),
  ],
  pages: {
    signIn: "/admin/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
