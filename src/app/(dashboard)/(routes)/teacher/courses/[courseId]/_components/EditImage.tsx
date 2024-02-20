"use client";

import { Button } from "@/components/ui/button";

import { Course } from "@prisma/client";
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

const formSchema = z.object({
  id: z.string(),
  image: z.string().min(1, "image is required"),
});

export type EditImageType = z.infer<typeof formSchema>;

function EditImage({ course }: { course: Course }) {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const router = useRouter();

  const { toast } = useToast();

  const form = useForm<EditImageType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: course.id,
      image: course.imageUrl ? course.imageUrl : "",
    },
  });

  const { formState } = form;
  const handleEdit = () => {
    setIsEdit((prev) => !prev);
  };

  async function onSubmit(values: EditImageType) {
    const data = await editImage(values);

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
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 ">
      <div className="mt-4 bg-muted rounded-md p-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Course Image</h3>

          <Button
            onClick={handleEdit}
            variant={"ghost"}
            className="text-slate-700 "
          >
            {!isEdit && !course.imageUrl && (
              <div className="flex items-center gap-1">
                <PlusCircle size={16} /> Add image
              </div>
            )}
            {!isEdit && course.imageUrl && (
              <div className="flex items-center gap-1">
                <EditIcon size={16} /> Edit image
              </div>
            )}
            {isEdit && <>cancel</>}
          </Button>
        </div>
        {isEdit ? (
          <>
            <FileUpload
              endpoint="courseImage"
              onChange={(url) => {
                if (url) {
                  onSubmit({ image: url, id: course.id });
                }
              }}
            />
            <p className="text-xs text-muted-foreground mt-4">
              16:0 aspect ratio recommanded
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
export default EditImage;
