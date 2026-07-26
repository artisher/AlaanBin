import { NextRequest, NextResponse } from "next/server";



export function middleware(req: NextRequest) {
    const token = req.cookies.get("token")?.value;
    const { pathname } = req.nextUrl;

    const publicRoutes = ["/", "/login", "/register"];

    if (token && publicRoutes.includes(pathname)) {
        return NextResponse.redirect(new URL("/home", req.url));
    }

    if (
        !token &&
        (
            pathname === "/home" ||
            pathname === "/account" ||
            pathname === "/subscription" ||
            pathname.startsWith("/movies") ||
            pathname.startsWith("/admin")
        )
    ) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
}