import IconWrapper from "@/components/globals/IconWrapper";

import { ReactNode } from "react";

interface Props {
  numberOfItems: number;
  variant?: "default" | "success";
  label: string;
  icon: ReactNode;
}
function InfoCard({ variant, icon, label, numberOfItems }: Props) {
  return (
    <div className="border rounded-md flex items-center gap-x-2 p-3">
      <IconWrapper icon={icon} success={variant === "success"} />
      <div>
        <p className="font-meduim">{label}</p>
        <p className="text-gray-500 text-sm">
          {numberOfItems} {numberOfItems === 1 ? "Course" : "Courses"}
        </p>
      </div>
    </div>
  );
}
export default InfoCard;
