"use client";

import { Button } from "@/components/ui/button";

import { Attachment, Course } from "@prisma/client";
import { EditIcon, FileImage, ImageIcon, PlusCircle } from "lucide-react";
import { useState } from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

import Image from "next/image";
import FileUpload from "./UploadImage";
import { editImage } from "@/app/actions/editImage";
import { editAttachment } from "@/app/actions/editAttachment";

const formSchema = z.object({
  courseId: z.string(),
  url: z.string().min(1, "url is required"),
});

export type EditAttachmentType = z.infer<typeof formSchema>;

interface Props {
  course: Course & { attachments: Attachment[] };
}
function EditAttachment({ course }: Props) {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const router = useRouter();

  const { toast } = useToast();

  const handleEdit = () => {
    setIsEdit((prev) => !prev);
  };

  async function onSubmit(values: EditAttachmentType) {
    const data = await editAttachment(values);

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
          <h3 className="text-lg font-medium">Course attachments</h3>

          <Button
            onClick={handleEdit}
            variant={"ghost"}
            className="text-slate-700 "
          >
            {!isEdit && course.attachments.length === 0 && (
              <div className="flex items-center gap-1">
                <PlusCircle size={16} /> Add file
              </div>
            )}
            {!isEdit && course.attachments.length !== 0 && (
              <div className="flex items-center gap-1">
                <EditIcon size={16} /> Edit file
              </div>
            )}
            {isEdit && <>cancel</>}
          </Button>
        </div>
        {isEdit ? (
          <>
            <FileUpload
              endpoint="courseAttachment"
              onChange={(url) => {
                if (url) {
                  onSubmit({ url: url, courseId: course.id });
                }
              }}
            />
            <p className="text-xs text-muted-foreground mt-4">
              Add anything your students might need to complete the course
            </p>
          </>
        ) : (
          <div className="relative aspect-video ">
            {!isEdit && course.imageUrl ? (
              <Image
                src={course.imageUrl}
                alt="course image"
                fill
                loading="lazy"
                className="rounded-md object-cover"
              />
            ) : (
              <div className="relative aspect-video bg-gray-200 rounded-md flex flex-col items-center justify-center">
                <FileImage size={100} className="text-slate-500" />
                <p className="text-xs text-muted-foreground mt-4">
                  You have no image yet
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
export default EditAttachment;
