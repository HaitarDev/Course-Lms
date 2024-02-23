"use client";

import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Chapter, Course } from "@prisma/client";
import { Edit } from "lucide-react";
import { useState } from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { editChapterDescription } from "@/app/actions/chapter/editChapterDescription";

const formSchema = z.object({
  description: z.string().min(1, "Title is required"),
  id: z.string(),
});

export type EditChapterDescription = z.infer<typeof formSchema>;

function EditChapterDescription({ chapter }: { chapter: Chapter }) {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const router = useRouter();

  const { toast } = useToast();

  const form = useForm<EditChapterDescription>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: chapter.description ? chapter.description : "",
      id: chapter.id,
    },
  });

  const { formState } = form;
  const handleEdit = () => {
    setIsEdit((prev) => !prev);
  };

  async function onSubmit(values: EditChapterDescription) {
    const data = await editChapterDescription(values);

    if (!data?.success) {
      return toast({
        variant: "destructive",
        title: data?.message,
      });
    }

    if (data?.success) {
      toast({
        title: data?.message,
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
          <h3 className="text-lg font-medium">Chapter description</h3>

          <Button
            onClick={handleEdit}
            variant={"ghost"}
            className="text-slate-700"
          >
            {isEdit ? (
              "Cancel"
            ) : (
              <div className="flex items-center gap-1">
                <Edit size={16} /> Edit description
              </div>
            )}
          </Button>
        </div>
        {isEdit ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <>
                    <Input
                      {...field}
                      disabled={formState.isSubmitting}
                      placeholder="describe your chapter"
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
        ) : !chapter.description ? (
          <p className="text-sm italic text-slate-600">
            No description chapter{" "}
          </p>
        ) : (
          <h2>{chapter.description}</h2>
        )}
      </div>
    </div>
  );
}
export default EditChapterDescription;
