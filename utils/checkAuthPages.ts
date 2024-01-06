const AUTH_PAGES = ["/login", "/register"];

export const isAuthPages = (url) => AUTH_PAGES.some((page) => page.startsWith(url));