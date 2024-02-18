import { PropsWithChildren } from "react";

function AuthLayout({ children }: PropsWithChildren) {
  return <div className="h-full w-full flex  justify-center">{children}</div>;
}
export default AuthLayout;
