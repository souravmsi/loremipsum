import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = process.env.JWT_SECRET;

const protectedRoutes = [
    "/",
    "/clients",
    "/rtm/real-time-bids",
    "/rtm",
    "/rtm/advance-bids",
];

const publicRoutes = ["/sign-in", "/sign-up"];

export default async function middleware(req: NextRequest) {
    // const path = req.nextUrl.pathname;
    // const cookie = req.cookies.get("token");
    // const token = cookie?.value;
    // if (token) {
    //     try {
    //         const secret = new TextEncoder().encode(JWT_SECRET);
    //         await jwtVerify(token, secret);
    //     } catch {
    //         const response = NextResponse.redirect(
    //             new URL("/sign-in", req.url)
    //         );
    //         response.cookies.delete("token");
    //         return response;
    //     }
    // }

    // const isProtectedRoute = protectedRoutes.includes(path);
    // const isPublicRoute = publicRoutes.includes(path);

    // if (isPublicRoute && cookie) {
    //     return NextResponse.redirect(new URL("/", req.url));
    // }

    // if (isProtectedRoute && !cookie) {
    //     return NextResponse.redirect(new URL("/sign-in", req.url));
    // }

    return NextResponse.next();
}
