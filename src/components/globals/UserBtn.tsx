"use client";
import { signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Popover } from "../ui/popover";
import { PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";

function UserBtn() {
  const { data } = useSession();
  const user = data?.user;

  const handleSignOut = async () => {
    await signOut();
  };
  return (
    <Popover>
      <PopoverTrigger>
        <Avatar>
          <AvatarImage src={user?.image!} alt={user?.email!} />
          <AvatarFallback>
            {user?.email?.toUpperCase().slice(0, 2)}
          </AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent className="mr-3 z-50">
        <div className="p-2 bg-white rounded-md shadow-md border">
          <p className="font-medium mb-2 leading-5">{user?.email}</p>
          <Button onClick={handleSignOut} variant={"ghost"} className="w-full">
            <LogOut />
            Logout
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
export default UserBtn;
