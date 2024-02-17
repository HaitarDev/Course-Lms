"use client";
import { SIDEBAR_TABS, TEACHER_TABS } from "@/lib/const";
import { Button } from "../ui/button";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { isActive } from "@/utils/isActive";

function SideBar() {
  const router = useRouter();
  const pathname = usePathname();

  const isTeacherMode = pathname?.includes("teacher");
  const tabs = isTeacherMode ? TEACHER_TABS : SIDEBAR_TABS;

  return (
    <div className="hidden lg:block w-[350px] border-r p-2 ">
      <div className="my-2 flex flex-col gap-2">
        {tabs.map((tab) => (
          <Button
            key={tab.label}
            variant={"ghost"}
            className={cn(
              "w-full justify-start gap-3  text-base py-6 text-slate-700",
              {
                "bg-secondary text-black ": isActive(pathname, tab.href),
              }
            )}
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
export default SideBar;
