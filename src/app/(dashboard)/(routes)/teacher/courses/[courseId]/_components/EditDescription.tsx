"use client";

import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";

import { Course } from "@prisma/client";
import { Edit, EditIcon, PlusCircle } from "lucide-react";
import { useState } from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

import { Textarea } from "@/components/ui/textarea";
import { editDescription } from "@/app/actions/editDescription";

const formSchema = z.object({
  id: z.string(),
  description: z.string().min(1, "description is required"),
});

export type EditDescriptionType = z.infer<typeof formSchema>;

function EditDescription({ course }: { course: Course }) {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const router = useRouter();

  const { toast } = useToast();

  const form = useForm<EditDescriptionType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: course.id,
      description: course.description ? course.description : "",
    },
  });

  const { formState } = form;
  const handleEdit = () => {
    setIsEdit((prev) => !prev);
  };

  async function onSubmit(values: EditDescriptionType) {
    const data = await editDescription(values);

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
          <h3 className="text-lg font-medium">Course description</h3>

          <Button
            onClick={handleEdit}
            variant={"ghost"}
            className="text-slate-700 "
          >
            {!isEdit && !course.description && (
              <div className="flex items-center gap-1">
                <PlusCircle size={16} /> Add description
              </div>
            )}
            {!isEdit && course.description && (
              <div className="flex items-center gap-1">
                <EditIcon size={16} /> Edit description
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
                name="description"
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
        ) : course.description ? (
          <h2 className="text-lg text-slate-800">{course.description}</h2>
        ) : (
          <h2 className="text-md text-slate-700 italic">No description</h2>
        )}
      </div>
    </div>
  );
}
export default EditDescription;
