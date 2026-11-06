import CredentialsProvider from "next-auth/providers/credentials";
import crypto from "crypto";
import { compare } from "bcryptjs";
import type { NextAuthOptions } from "next-auth";
import { prisma } from "@/lib/db";

export const authOptions: NextAuthOptions = {
  providers: [
    // 1. Provider Administrateur (SHA-256)
    CredentialsProvider({
      id: "credentials",
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
          role: "admin" as const,
        };
      },
    }),

    // 2. Provider Élève (utilisé par /connexion)
    CredentialsProvider({
      id: "student-credentials",
      name: "Student Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email?.trim().toLowerCase();
        const password = credentials?.password || "";

        if (!email || !password) return null;

        const student = await prisma.student.findUnique({
          where: { email },
        });

        if (!student || !student.isActive || !student.passwordHash) {
          return null;
        }

        const valid = await compare(password, student.passwordHash);
        if (!valid) return null;

        await prisma.student.update({
          where: { id: student.id },
          data: { lastLoginAt: new Date() },
        });

        return {
          id: student.id,
          studentId: student.id,
          name: student.fullName,
          email: student.email,
          role: "student" as const,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const u = user as {
          id?: string;
          role?: "admin" | "student";
          studentId?: string;
        };
        token.role = u.role ?? "admin";
        if (u.role === "student") {
          token.studentId = u.studentId ?? u.id;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = (token.role as "admin" | "student") ?? "admin";
        if (token.studentId) {
          session.user.studentId = token.studentId as string;
        }
      }
      return session;
    },
  },

  pages: {
    signIn: "/admin/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
