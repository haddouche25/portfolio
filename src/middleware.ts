import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware() {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;

        // Always permit login route
        if (pathname === "/admin/login") {
          return true;
        }

        // Require valid JWT for all other protected paths
        return !!token;
      },
    },
    pages: {
      signIn: "/admin/login",
    },
  },
);

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
