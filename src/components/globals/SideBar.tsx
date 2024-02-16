"use client";
import { SIDEBAR_TABS } from "@/lib/const";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

function sideBar() {
  const router = useRouter();
  return (
    <div className="hidden lg:block w-[350px] border-r p-1 ">
      <div className="my-2 flex flex-col gap-2">
        {SIDEBAR_TABS.map((tab) => (
          <Button
            key={tab.label}
            variant={"ghost"}
            size={"lg"}
            className="w-full justify-start gap-3 text-slate-700"
            onClick={() => router.push(tab.href)}
          >
            {tab.icon}
            {tab.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
export default sideBar;
