"use client";

import UserBtn from "./UserBtn";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "../ui/button";
import LogoutBtn from "./LogoutBtn";

function NavbarMode() {
  const pathname = usePathname();

  const isTeacher =
    pathname.startsWith("/teacher") || pathname.startsWith("/courses");

  const renderTeacherOrExitBtn = isTeacher ? (
    <LogoutBtn />
  ) : (
    <Link href={"/teacher/courses"}>
      <Button variant={"ghost"}>Teacher mode</Button>
    </Link>
  );

  return (
    <div className="flex gap-1">
      {renderTeacherOrExitBtn}
      <UserBtn />
    </div>
  );
}
export default NavbarMode;
