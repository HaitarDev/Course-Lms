"use client";

import { cn } from "@/lib/utils";
import { CheckCircle, Lock, PlayCircle } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

interface Props {
  id: string;
  label: string;
  isCompleted: boolean;
  courseId: string;
  isLocked: boolean;
}

function CourseSidebarItem({
  id,
  label,
  isCompleted,
  courseId,
  isLocked,
}: Props) {
  const pathname = usePathname();
  const router = useRouter();

  const Icon = isLocked ? Lock : isCompleted ? CheckCircle : PlayCircle;

  const isActive = pathname?.includes(id);

  const onClick = () => {
    router.push(`/courses/${courseId}/chapters/${id}`);
  };
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-x-2 text-slate-800 text-sm font-[500] pl-6 transition-all hover:text-primary/80 hover:bg-secondary/70",
        isActive && "text-primary/70 bg-secondary/70",
        isCompleted && "text-emerald-700 hover:text-emerald-700",
        isCompleted && isActive && "bg-emerald-200/20"
      )}
    >
      <div className="flex items-center gap-x-2 py-4">
        <Icon
          size={22}
          className={cn(
            isActive && "text-primary/70",
            isCompleted && "text-emerald-700"
          )}
        />
        {label}
        as
      </div>
      <div
        className={cn(
          "ml-auto opacity-0 border-2 border-primary/90 h-full transition-all",
          isActive && "opacity-100",
          isCompleted && "border-emerald-700"
        )}
      ></div>
    </button>
  );
}
export default CourseSidebarItem;
