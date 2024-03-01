"use client";

import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";

interface Props {
  price: number;
  courseId: string;
}
function CourseEnrollBtn({ courseId, price }: Props) {
  return (
    <Button size={"sm"} className="w-full md:w-auto">
      Enroll for {formatPrice(price)}
    </Button>
  );
}
export default CourseEnrollBtn;
