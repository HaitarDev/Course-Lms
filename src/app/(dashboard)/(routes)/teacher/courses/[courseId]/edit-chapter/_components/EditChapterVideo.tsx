"use client";

import { Button } from "@/components/ui/button";

import MuxPlayer from "@mux/mux-player-react";

import { Chapter, MuxData } from "@prisma/client";
import { EditIcon, PlusCircle, Videotape } from "lucide-react";
import { useState } from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

import FileUpload from "../../_components/UploadImage";
import { editChapterVideo } from "@/app/actions/chapter/editChapterVideo";

const formSchema = z.object({
  id: z.string(),
  courseId: z.string(),
  videoUrl: z.string(),
});

export type EditVideoType = z.infer<typeof formSchema>;

function EditChapterVideo({
  chapter,
  courseId,
}: {
  chapter: Chapter & { muxData?: MuxData | null };
  courseId: string;
}) {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const router = useRouter();

  const { toast } = useToast();

  const form = useForm<EditVideoType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: chapter.id,
      courseId,
      videoUrl: chapter.videoUrl ? chapter.videoUrl : "",
    },
  });

  const handleEdit = () => {
    setIsEdit((prev) => !prev);
  };

  async function onSubmit(values: EditVideoType) {
    const data = await editChapterVideo(values);

    if (!data?.success) {
      return toast({
        variant: "destructive",
        description: data?.message,
      });
    }

    if (data?.success) {
      toast({
        description: data?.message,
        color: "red",
      });
      handleEdit();
      router.refresh();
    }
  }

  return (
    <div className="">
      <div className="mt-4 bg-muted rounded-md p-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Course video</h3>

          <Button
            onClick={handleEdit}
            variant={"ghost"}
            className="text-slate-700 "
          >
            {!isEdit && !chapter.videoUrl && (
              <div className="flex items-center gap-1">
                <PlusCircle size={16} /> Add video
              </div>
            )}
            {!isEdit && chapter.videoUrl && (
              <div className="flex items-center gap-1">
                <EditIcon size={16} /> Edit video
              </div>
            )}
            {isEdit && <>cancel</>}
          </Button>
        </div>
        {isEdit ? (
          <>
            <FileUpload
              endpoint="courseChapterVideo"
              onChange={(url) => {
                if (url) {
                  onSubmit({ videoUrl: url, id: chapter.id, courseId });
                }
              }}
            />
            <p className="text-xs text-muted-foreground mt-4">
              16:0 aspect ratio recommanded
            </p>
          </>
        ) : (
          <div className="relative aspect-video ">
            {!isEdit && chapter.videoUrl ? (
              <MuxPlayer src={chapter.videoUrl} />
            ) : (
              <div className="relative aspect-video bg-gray-200 rounded-md flex flex-col items-center justify-center">
                <Videotape size={100} className="text-slate-500" />
                <p className="text-xs text-muted-foreground mt-4">
                  You have no video yet
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
export default EditChapterVideo;
