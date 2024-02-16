"use client";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SIDEBAR_TABS } from "@/lib/const";
import { Menu } from "lucide-react";

function MobileSidebar() {
  return (
    <Sheet>
      <SheetTrigger>
        <div className="p-2 rounded-full hover:bg-slate-100">
          <Menu />
        </div>
      </SheetTrigger>

      <SheetContent side={"left"}>
        <div className="my-4 flex flex-col gap-2">
          {SIDEBAR_TABS.map((tab) => (
            <Button
              key={tab.label}
              variant={"ghost"}
              className="w-full justify-start gap-3 text-slate-700"
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
