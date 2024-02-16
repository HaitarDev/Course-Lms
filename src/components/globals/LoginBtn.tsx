import { LogIn } from "lucide-react";
import { Button } from "../ui/button";

function LoginBtn() {
  return (
    <Button variant={"outline"} className="flex items-center gap-1">
      <LogIn width={15} /> Login
    </Button>
  );
}
export default LoginBtn;
