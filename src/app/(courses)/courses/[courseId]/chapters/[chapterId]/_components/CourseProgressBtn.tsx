"use client";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useConfettiStore } from "../../../../../../../../hooks/use-confetti-store";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { updateCompletedChapter } from "@/app/actions/chapter/updateCompletedChapter";

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
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();
  const router = useRouter();
  const confetti = useConfettiStore();

  const onClick = async () => {
    try {
      setIsLoading(true);
      const { userProgress, success, message } = await updateCompletedChapter(
        !isCompleted,
        chapterId
      );

      console.log(userProgress, message, success);

      if (!isCompleted && !nextChapterId) {
        confetti.onOpen();
      }

      if (!isCompleted && nextChapterId) {
        router.push(`/courses/${courseId}/chapters/${nextChapterId}`);
      }

      toast({
        variant: "default",
        title: "Progress updated.",
      });
      router.refresh();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Something went wrong.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const Icon = isCompleted ? XCircle : CheckCircle;

  return (
    <Button
      onClick={onClick}
      disabled={isLoading}
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
