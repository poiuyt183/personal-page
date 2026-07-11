import { NextResponse } from "next/server";
import {
  createSessionToken,
  SESSION_COOKIE,
  SESSION_MAX_AGE_S,
} from "@/lib/adminAuth";

export async function POST(req: Request) {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) {
    return NextResponse.json(
      { error: "Chưa cấu hình ADMIN_PASSWORD" },
      { status: 500 },
    );
  }

  let input: { password?: string };
  try {
    input = await req.json();
  } catch {
    return NextResponse.json({ error: "Body không hợp lệ" }, { status: 400 });
  }

  if (input.password !== password) {
    return NextResponse.json(
      { error: "Mật khẩu không đúng" },
      { status: 401 },
    );
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, await createSessionToken(password), {
    maxAge: SESSION_MAX_AGE_S,
    httpOnly: true,
    sameSite: "lax",
    path: "/",
  });
  return res;
}
