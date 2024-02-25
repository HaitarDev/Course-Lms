"use client";

import { Button } from "@/components/ui/button";
import { Course } from "@prisma/client";
import { Trash2Icon } from "lucide-react";
import ModalDelete from "@/app/(dashboard)/(routes)/teacher/courses/[courseId]/_components/ModalDeleteAttachment";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { deleteChapter } from "@/app/actions/chapter/deleteChapter";
import { useRouter } from "next/navigation";
import { publishChapter } from "@/app/actions/chapter/publishChapter";
import { unpublishChapter } from "@/app/actions/chapter/unpublishChapter";
import { deleteCourse } from "@/app/actions/deleteCourse";

interface Props {
  course: Course;
}

function PublishedCourse({ course }: Props) {
  const [isLoading, setLoading] = useState(false);

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

  const handlePublishChapter = async (courseId: string) => {
    try {
      setLoading(true);
      const data = await publishChapter({ chapterId, courseId });

      if (data?.success) {
        toast({
          description: data?.message,
          variant: "default",
        });
        router.refresh();

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

  const handleUnpublishChapter = async (chapterId: string) => {
    try {
      setLoading(true);
      const data = await unpublishChapter({ chapterId, courseId });

      if (data?.success) {
        toast({
          description: data?.message,
          variant: "default",
        });
        router.refresh();

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
  return (
    <div className="flex gap-4">
      {course.isPublished ? (
        <Button
          size={"sm"}
          // onClick={() => handleUnpublishChapter(chapter.id)}
        >
          Unpublish
        </Button>
      ) : (
        <Button
          size={"sm"}
          //  onClick={() => handlePublishChapter(chapter.id)}
        >
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
