"use client";

import Image from "next/image";
import MobileSidebar from "@/app/(dashboard)/_components/MobileSidebar";
import SearchBar from "../ui/SearchBar";

import { usePathname, useRouter } from "next/navigation";

import NavbarMode from "./NavbarMode";

function Navbar() {
  const pathname = usePathname();

  const isSearching = pathname === "/search";

  return (
    <div className="p-4 mx-auto border-b shadow-sm h-16">
      {/* mobile */}
      <div className="lg:hidden flex justify-between items-center h-full">
        <MobileSidebar />
        <NavbarMode />
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
        <div className="hidden lg:block mx-10 lg:w-[600px]">
          {isSearching && <SearchBar />}
        </div>
        <NavbarMode />
      </div>
    </div>
  );
}
export default Navbar;
