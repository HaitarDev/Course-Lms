"use client";

import { Button } from "@/components/ui/button";
import { Course } from "@prisma/client";
import { Trash2Icon } from "lucide-react";
import ModalDelete from "@/app/(dashboard)/(routes)/teacher/courses/[courseId]/_components/ModalDeleteAttachment";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

import { useRouter } from "next/navigation";

import { deleteCourse } from "@/app/actions/deleteCourse";
import { revalidatePath } from "next/cache";
import { publishCourse } from "@/app/actions/publishCourse";
import { unpublishCourse } from "@/app/actions/unpublishCourse";
import { useConfettiStore } from "../../../../../../../../hooks/use-confetti-store";

interface Props {
  course: Course;
}

function PublishedCourse({ course }: Props) {
  const [isLoading, setLoading] = useState(false);
  const confetti = useConfettiStore();

  const { toast } = useToast();
  const router = useRouter();
  const handleDeleteCourse = async (courseId: string) => {
    try {
      setLoading(true);
      const data = await deleteCourse(courseId);

      if (data?.success) {
        toast({
          description: data?.message,
          variant: "default",
        });
        router.refresh();
        router.push(`/teacher/courses`);
        // revalidatePath(`/teacher/courses/${courseId}`);
      }

      if (!data?.success) {
        toast({
          variant: "destructive",
          description: data?.message,
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handlePublishCourse = async (courseId: string) => {
    try {
      setLoading(true);
      const data = await publishCourse(courseId);

      if (data?.success) {
        toast({
          description: data?.message,
          variant: "default",
        });
        router.refresh();
        confetti.onOpen();
        revalidatePath(`/teacher/courses/${courseId}`);
      }

      if (!data?.success) {
        toast({
          variant: "destructive",
          description: data?.message,
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUnpublishCourse = async (courseId: string) => {
    try {
      setLoading(true);
      const data = await unpublishCourse(courseId);

      if (data?.success) {
        toast({
          description: data?.message,
          variant: "default",
        });
        router.refresh();

        revalidatePath(`/teacher/courses`);
      }

      if (!data?.success) {
        toast({
          variant: "destructive",
          description: data?.message,
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex gap-4">
      {course.isPublished ? (
        <Button size={"sm"} onClick={() => handleUnpublishCourse(course.id)}>
          Unpublish
        </Button>
      ) : (
        <Button size={"sm"} onClick={() => handlePublishCourse(course.id)}>
          Publish
        </Button>
      )}

      <ModalDelete handleDelete={() => handleDeleteCourse(course.id)}>
        <Button disabled={isLoading} size={"sm"} variant={"outline"}>
          <Trash2Icon className="w-5" />
        </Button>
      </ModalDelete>
    </div>
  );
}
export default PublishedCourse;
