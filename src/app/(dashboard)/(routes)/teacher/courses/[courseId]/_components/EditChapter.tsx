"use client";

import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Chapter, Course } from "@prisma/client";
import { EditIcon, PlusCircle } from "lucide-react";
import { useState } from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

import { Textarea } from "@/components/ui/textarea";

import { editChapter } from "@/app/actions/editChapter";
import ChapterList from "./ChapterList";
import { unstable_noStore } from "next/cache";

const formSchema = z.object({
  courseId: z.string(),
  title: z.string().min(1, "title is required"),
});

export type EditChapterType = z.infer<typeof formSchema>;

function EditChapter({ course }: { course: Course & { chapters: Chapter[] } }) {
  unstable_noStore();

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const router = useRouter();

  const { toast } = useToast();

  const form = useForm<EditChapterType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      courseId: course.id,
      title: "",
    },
  });

  const { formState } = form;
  const handleEdit = () => {
    setIsEdit((prev) => !prev);
  };

  async function onSubmit(values: EditChapterType) {
    const data = await editChapter(values);

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
          <h3 className="text-lg font-medium">Course chapter</h3>

          <Button
            onClick={handleEdit}
            variant={"ghost"}
            className="text-slate-700 "
          >
            {!isEdit && course.chapters.length === 0 && (
              <div className="flex items-center gap-1">
                <PlusCircle size={16} /> Add chapter
              </div>
            )}
            {!isEdit && course.chapters.length !== 0 && (
              <div className="flex items-center gap-1">
                <EditIcon size={16} /> Edit chapter
              </div>
            )}
            {isEdit && <>cancel</>}
          </Button>
        </div>
        {isEdit ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <>
                    <Textarea
                      {...field}
                      disabled={formState.isSubmitting}
                      placeholder="e.g. Describe your course"
                    />

                    <FormMessage />
                  </>
                )}
              />

              <Button type="submit" className="mt-4">
                Save
              </Button>
            </form>
          </Form>
        ) : course.chapters.length > 0 ? (
          <ChapterList chapters={course.chapters} courseId={course.id} />
        ) : (
          <h2 className="text-md text-slate-700 italic">No chapters</h2>
        )}
      </div>
    </div>
  );
}
export default EditChapter;
