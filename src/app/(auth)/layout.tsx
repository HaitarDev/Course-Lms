import { PropsWithChildren } from "react";

function AuthLayout({ children }: PropsWithChildren) {
  return (
    <div className="relative h-full w-full flex  justify-center">
      <div className="absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      <main>{children}</main>
    </div>
  );
}
export default AuthLayout;
