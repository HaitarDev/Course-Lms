"use client";

import { Button } from "@/components/ui/button";
import { Form, FormField, FormMessage } from "@/components/ui/form";
import { Course } from "@prisma/client";
import { Edit, EditIcon, PlusCircle } from "lucide-react";
import { useState } from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

import { editCategory } from "@/app/actions/editCategory";
import { Combobox } from "@/components/ui/combobox";

const formSchema = z.object({
  id: z.string(),
  categoryId: z.string().min(1, "category is required"),
});

export type EditCategoryType = z.infer<typeof formSchema>;

interface Props {
  course: Course;
  categories: { label: string; value: string }[];
}
function EditCategory({ course, categories }: Props) {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const router = useRouter();

  const { toast } = useToast();

  const form = useForm<EditCategoryType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: course.id,
      categoryId: course.categoryId ? course.categoryId : "",
    },
  });

  const handleEdit = () => {
    setIsEdit((prev) => !prev);
  };

  async function onSubmit(values: EditCategoryType) {
    const data = await editCategory(values);

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

  const selectedCategory = categories.find(
    (cat) => cat.value === course.categoryId
  )?.label;

  return (
    <div className="">
      <div className="mt-4 bg-muted rounded-md p-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Course category</h3>

          <Button
            onClick={handleEdit}
            variant={"ghost"}
            className="text-slate-700 "
          >
            {!isEdit && !course.categoryId && (
              <div className="flex items-center gap-1">
                <PlusCircle size={16} /> Add category
              </div>
            )}
            {!isEdit && course.categoryId && (
              <div className="flex items-center gap-1">
                <EditIcon size={16} /> Edit category
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
                name="categoryId"
                render={({ field }) => (
                  <>
                    <Combobox {...field} options={categories} />

                    <FormMessage />
                  </>
                )}
              />

              <Button type="submit" className="mt-4">
                Save
              </Button>
            </form>
          </Form>
        ) : course.categoryId ? (
          <h2 className="text-lg text-slate-800">{selectedCategory}</h2>
        ) : (
          <h2 className="text-md text-slate-700 italic">No category</h2>
        )}
      </div>
    </div>
  );
}
export default EditCategory;
