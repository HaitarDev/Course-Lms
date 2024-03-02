"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { formatPrice } from "@/lib/format";
import { useState } from "react";
import axios from "axios";

interface Props {
  price: number;
  courseId: string;
}
function CourseEnrollBtn({ courseId, price }: Props) {
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();

  const onClick = async () => {
    try {
      setIsLoading(true);

      const res = await axios.post(`/api/checkout/${courseId}`);

      window.location.assign(res.data.url);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Something went wrong.",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Button
      onClick={onClick}
      size={"sm"}
      disabled={isLoading}
      className="w-full md:w-auto"
    >
      Enroll for {formatPrice(price)}
    </Button>
  );
}
export default CourseEnrollBtn;
