import "next-auth";
import "next-auth/jwt";

export type Role = "admin" | "student";

declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      studentId?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: Role;
      mustChangePassword?: boolean;
    };
  }

  interface User {
    id: string;
    studentId?: string;
    role?: Role;
    mustChangePassword?: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    studentId?: string;
    role?: Role;
    mustChangePassword?: boolean;
  }
}
