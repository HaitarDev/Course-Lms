export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/", "/teacher", "/teacher/:id+", "/courses", "/courses/:id+"],
};
