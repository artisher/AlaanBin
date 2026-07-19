import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    return NextResponse.next();
}

export const config = {
    matcher: [
        "/",
        "/login",
        "/register",
        "/subscription",
        "/home",
        "/account",
        "/movies/:path*",
        "/admin",
    ],
};