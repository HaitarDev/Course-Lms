import { Button } from "@/components/ui/button";
import { Course } from "@prisma/client";
import { CheckCircle, XCircle } from "lucide-react";

interface Props {
  chapterId: string;
  courseId: string;
  nextChapterId?: string;
  isCompleted?: boolean;
}

function CourseProgressBtn({
  chapterId,
  courseId,
  isCompleted,
  nextChapterId,
}: Props) {
  const Icon = isCompleted ? XCircle : CheckCircle;
  return (
    <Button
      type="button"
      variant={isCompleted ? "outline" : "success"}
      className="w-full md:w-auto"
    >
      {isCompleted ? "Not completed" : "Mark as complete"}
      <Icon className="h-4 w-4 ml-2" />
    </Button>
  );
}
export default CourseProgressBtn;
