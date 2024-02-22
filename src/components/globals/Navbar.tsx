"use client";

import Image from "next/image";
import LoginBtn from "./LogoutBtn";
import MobileSidebar from "@/app/(dashboard)/_components/MobileSidebar";
import SearchBar from "../ui/SearchBar";

import Link from "next/link";
import { Button } from "../ui/button";
import { usePathname, useRouter } from "next/navigation";

import UserBtn from "./UserBtn";

function Navbar() {
  const pathname = usePathname();

  const isTeacher = pathname.startsWith("/teacher");

  const renderTeacherOrExitBtn = isTeacher ? (
    <LoginBtn />
  ) : (
    <Link href={"/teacher/courses"}>
      <Button variant={"ghost"}>Teacher mode</Button>
    </Link>
  );

  return (
    <div className="p-4 mx-auto border-b shadow-sm h-16">
      {/* mobile */}
      <div className="lg:hidden flex justify-between items-center h-full">
        <MobileSidebar />
        <div className="flex gap-1">
          {renderTeacherOrExitBtn}
          <UserBtn />
        </div>
      </div>

      {/* large */}
      <div className="hidden lg:flex justify-between items-center h-full">
        <div>
          <Image
            src={"/logo/logoipsum-330.svg"}
            alt="logo"
            width={130}
            height={60}
          />
        </div>
        <div className=" mx-10 lg:w-[600px]">
          <SearchBar />
        </div>
        <div className="flex gap-1">
          {renderTeacherOrExitBtn}
          <UserBtn />
        </div>
      </div>
    </div>
  );
}
export default Navbar;
