import { NextResponse } from "next/server";
import { verifyJwtToken } from "./libs/auth";
import { isAuthPages } from "./utils/checkAuthPages";

export async function middleware(request) {
  const { url, nextUrl, cookies } = request;

  const { value: token } = cookies.get("jwt") ?? { value: null };

  const hasVerifiedToken = token && (await verifyJwtToken(token));

  const isAuthPageRequested = isAuthPages(nextUrl.pathname);

  if (isAuthPageRequested) {
    if (!hasVerifiedToken) {
      const response = NextResponse.next();
      response.cookies.delete("jwt");
      response.cookies.delete("accessToken");
      return response;
    }

    const response = NextResponse.redirect(new URL(`/`, url));
    return response;
  }

  if (!hasVerifiedToken) {
    const searchParams = new URLSearchParams(nextUrl.searchParams);
    searchParams.set("next", nextUrl.pathname);

    const response = NextResponse.redirect(
      new URL(`/login?${searchParams}`, url)
    );

    response.cookies.delete("jwt");
    response.cookies.delete("accessToken");
    return response;
  }

  return NextResponse.next();
}

export const config = { matcher: ["/dashboard", "/dashboard-server", "/login", "/register"] };