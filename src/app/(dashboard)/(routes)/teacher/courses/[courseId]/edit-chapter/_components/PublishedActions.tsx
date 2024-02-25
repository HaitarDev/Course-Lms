"use client";

import { Button } from "@/components/ui/button";
import { Chapter } from "@prisma/client";
import { Trash2Icon } from "lucide-react";
import { ModalDelete } from "../../_components/ModalDeleteAttachment";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { deleteChapter } from "@/app/actions/chapter/deleteChapter";
import { useRouter } from "next/navigation";

interface Props {
  courseId: string;
  chapter: Chapter;
}

function PublishedActions({ courseId, chapter }: Props) {
  const [isLoading, setLoading] = useState(false);

  const { toast } = useToast();
  const router = useRouter();
  const handleDeleteChapter = async (chapterId: string) => {
    try {
      setLoading(true);
      const data = await deleteChapter({ chapterId, courseId });

      if (data?.success) {
        toast({
          description: data?.message,
          variant: "default",
        });
        router.refresh();
        router.push(`/teacher/courses/${courseId}`);
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
      {chapter.isPublished ? (
        <Button size={"sm"}>Unpublish</Button>
      ) : (
        <Button size={"sm"}>Publish</Button>
      )}

      <ModalDelete handleDelete={() => handleDeleteChapter(chapter.id)}>
        <Button disabled={isLoading} size={"sm"} variant={"outline"}>
          <Trash2Icon className="w-5" />
        </Button>
      </ModalDelete>
    </div>
  );
}
export default PublishedActions;
