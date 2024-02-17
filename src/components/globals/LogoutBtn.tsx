import { LogOut } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

function LogoutBtn() {
  return (
    <Link href={"/"}>
      <Button variant={"outline"} className="flex items-center gap-1">
        Exit
        <LogOut width={15} />
      </Button>
    </Link>
  );
}
export default LogoutBtn;
