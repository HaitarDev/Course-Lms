"use client";

import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Course } from "@prisma/client";
import { Edit } from "lucide-react";
import { useState } from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { editTitle } from "@/app/actions/editTitle";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  id: z.string(),
});

export type EditTitleType = z.infer<typeof formSchema>;

function EditTitle({ course }: { course: Course }) {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const router = useRouter();

  const { toast } = useToast();

  const form = useForm<EditTitleType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: course.title,
      id: course.id,
    },
  });

  const { formState } = form;
  const handleEdit = () => {
    setIsEdit((prev) => !prev);
  };

  async function onSubmit(values: EditTitleType) {
    const data = await editTitle(values);

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
          <h3 className="text-lg font-medium">Course title</h3>

          <Button
            onClick={handleEdit}
            variant={"ghost"}
            className="text-slate-700 "
          >
            {isEdit ? (
              "Cancel"
            ) : (
              <div className="flex items-center gap-1">
                <Edit size={16} /> Edit title
              </div>
            )}
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
                    <Input
                      {...field}
                      disabled={formState.isSubmitting}
                      placeholder="e.g. Advanced digital marketing"
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
        ) : (
          <h2 className="text-lg text-slate-800">{course.title}</h2>
        )}
      </div>
    </div>
  );
}
export default EditTitle;
