import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

type Props = {
  icon: ReactNode;
  primary?: boolean;
  secondary?: boolean;
  success?: boolean;
  size?: "sm" | "md" | "lg";
};

function IconWrapper({
  icon,
  primary = true,
  secondary = false,
  success = false,
  size = "md",
}: Props) {
  return (
    <div
      className={cn(
        "rounded-full flex justify-center items-center p-1 shadow-sm",
        {
          "bg-primary/80 text-yellow-300": primary,
          "bg-blue-500/80 text-blue-700": secondary,
          "bg-emerald-500/90 text-emerald-800": success,
          "w-8 h-8": size === "sm",
          "w-9 h-9": size === "md",
          "w-10 h-10": size === "lg",
        }
      )}
    >
      {icon}
    </div>
  );
}
export default IconWrapper;
