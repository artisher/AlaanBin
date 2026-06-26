import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const body = await req.json();
    const { email } = body;
    if (!email) {
        return NextResponse.json({ error: "Email reqired" }, { status: 400 })
    }
    const response = NextResponse.json({ success: true })
    response.cookies.set("session", email, {
        httpOnly: true,
        secure: false, //change
        path: "/"
    })
    return response
}