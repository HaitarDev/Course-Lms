"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SIDEBAR_TABS, TEACHER_TABS } from "@/lib/const";
import { cn } from "@/lib/utils";
import { isActive } from "@/utils/isActive";
import { Menu } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

function MobileSidebar() {
  const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false);

  const router = useRouter();
  const pathname = usePathname();

  const isTeacherMode = pathname?.includes("teacher");
  const tabs = isTeacherMode ? TEACHER_TABS : SIDEBAR_TABS;

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger>
        <div className="p-2 rounded-full hover:bg-slate-100">
          <Menu />
        </div>
      </SheetTrigger>

      <SheetContent side={"left"}>
        <div className="my-4 flex flex-col gap-2">
          {tabs.map((tab) => (
            <Button
              key={tab.label}
              variant={"ghost"}
              size={"lg"}
              className={cn("w-full justify-start gap-3 text-slate-700", {
                "bg-secondary text-black": isActive(pathname, tab.href),
              })}
              onClick={() => {
                router.push(tab.href);
                setIsSheetOpen((prev) => !prev);
              }}
            >
              {tab.icon}
              {tab.label}
            </Button>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
export default MobileSidebar;
