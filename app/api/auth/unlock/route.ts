import { NextResponse } from "next/server";

const ACCESS_COOKIE_NAME = "rf_access";

type UnlockBody = {
  password?: string;
};

export async function POST(request: Request) {
  const { password } = (await request.json()) as UnlockBody;

  const expectedPassword = process.env.ACCESS_PASSWORD;
  const sessionToken = process.env.ACCESS_SESSION_TOKEN;

  if (!expectedPassword || !sessionToken) {
    return NextResponse.json(
      { ok: false, message: "Configuracao de seguranca ausente no servidor." },
      { status: 500 }
    );
  }

  if (!password || password !== expectedPassword) {
    return NextResponse.json(
      { ok: false, message: "Senha invalida." },
      { status: 401 }
    );
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set({
    name: ACCESS_COOKIE_NAME,
    value: sessionToken,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12,
  });

  return response;
}
