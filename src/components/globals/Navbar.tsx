import { LogIn, Menu } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";
import LoginBtn from "./LoginBtn";
import MobileSidebar from "@/app/(dashboard)/_components/MobileSidebar";

function Navbar() {
  return (
    <div className="p-4 mx-auto border-b shadow-sm h-16">
      {/* mobile */}
      <div className="lg:hidden flex justify-between items-center h-full">
        <MobileSidebar />
        <LoginBtn />
      </div>

      {/* large */}
      <div className="hidden lg:flex justify-between items-center h-full">
        <div>
          <Image
            src={"/logo/logoipsum-330.svg"}
            alt="logo"
            width={130}
            height={60}
            className=""
          />
        </div>
        <div className="flex-grow mx-10">SearchBar</div>
        <LoginBtn />
      </div>
    </div>
  );
}
export default Navbar;
