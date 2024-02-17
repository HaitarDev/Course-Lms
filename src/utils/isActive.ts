export const isActive = (pathname: string, href: string) =>
  pathname === href || (pathname?.startsWith(href) && !href.endsWith("/"));
