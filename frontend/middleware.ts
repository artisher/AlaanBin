// // middleware.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
    const sessionCookie = req.cookies.get('token');
    const url = req.nextUrl.clone();

    console.log("=== Middleware ===");
    console.log("PATH:", req.nextUrl.pathname);

    const token = req.cookies.get("token")?.value;
    console.log("TOKEN:", token ? "YES" : "NO");
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`,
        {
            headers: {
                Cookie: `token=${token}`
            }
        }
    );
    const data = await res.json();

    const hasActiveSubscription = data.user?.hasActiveSubscription
    const role = data.user?.role



    if (url.pathname === '/subscription' && !sessionCookie) {

        url.pathname = '/login'
        return NextResponse.redirect(url);
    }

    if (url.pathname === '/' && sessionCookie || url.pathname === "/login" && sessionCookie || url.pathname === "/register" && sessionCookie) {

        url.pathname = '/home';
        return NextResponse.redirect(url);
    }
    if (url.pathname === '/home' && !sessionCookie) {

        url.pathname = '/login'
        return NextResponse.redirect(url);
    }

    if (url.pathname.startsWith('/movies') && !sessionCookie) {
        url.pathname = '/login';
        return NextResponse.redirect(url);
    }

    if (url.pathname === '/account' && !sessionCookie) {

        url.pathname = '/login'
        return NextResponse.redirect(url);
    }

    if (url.pathname.startsWith("/admin") && !sessionCookie) {

        url.pathname = '/login'
        return NextResponse.redirect(url);
    }
    if (url.pathname.startsWith("/admin") && role === "user") {

        url.pathname = '/'
        return NextResponse.redirect(url);
    }

    if (url.pathname.startsWith('/movies') && !hasActiveSubscription) {
        url.pathname = '/subscription';
        return NextResponse.redirect(url);
    }
    return NextResponse.next();
}

export const config = {
    matcher: ['/', '/login', '/register', '/subscription', '/home', '/account', '/movies/:path*', '/admin'],

};


