import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import envConfig from "./config/env";

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const token = req.cookies.get("token")?.value;

  const isAuthPage = path === "/sign-in" || path === "/sign-up";

  if (token) {
    try {
      const secret = new TextEncoder().encode(envConfig.JWT.JWT_SECRET);
      const { payload } = await jwtVerify(token, secret);

      const role : string = payload.role!;
      const userId = payload.sub!;

      console.log(role, 'role middle ware')

      const requestHeaders = new Headers(req.headers);
      requestHeaders.set("user-id", userId);
      requestHeaders.set("role", role);

      // 🔒 Block access to /sign-in and /sign-up for logged-in users
      if (isAuthPage) {
        const redirectPath =
          role === "STUDENT"
            ? "/student"
            : role === "COMPANY"
            ? "/company"
            : "/en"; // for MINISTRY or PHDCC

        return NextResponse.redirect(new URL(redirectPath, req.url));
      }

      // ✅ Role-based route access
      const allowed =
        (role === "STUDENT" && path.startsWith("/student")) ||
        (role === "COMPANY" && path.startsWith("/company")) ||
        ((role === "MINISTRY" || role === "PHDCC") && path.startsWith("/en"));

      if (!allowed) {
        return NextResponse.redirect(new URL("/unauthorized", req.url));
      }

      // Pass valid request through
      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    } catch {
      // Invalid token – redirect to sign-in
      const response = NextResponse.redirect(new URL("/sign-in", req.url));
      response.cookies.delete("token");
      return response;
    }
  } else {
    // 🔐 Protect /student, /company, /en routes for unauthenticated users
    const isProtected = path.startsWith("/student") || path.startsWith("/company") || path.startsWith("/en");
    if (isProtected) {
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }

    // Public routes (sign-in, sign-up, homepage, etc.)
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    "/sign-in",
    "/sign-up",
    "/student/:path*",
    "/company/:path*",
    "/en/:path*",
  ],
};
