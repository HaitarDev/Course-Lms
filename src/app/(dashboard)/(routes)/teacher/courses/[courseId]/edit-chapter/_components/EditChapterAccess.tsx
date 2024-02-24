"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Chapter, Course } from "@prisma/client";
import { Edit } from "lucide-react";
import { useState } from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { editChapterAccess } from "@/app/actions/chapter/editChapterAccess";

const formSchema = z.object({
  isFree: z.boolean().default(false),
  id: z.string(),
});

export type EditChapterAccessType = z.infer<typeof formSchema>;

function EditChapterAccess({ chapter }: { chapter: Chapter }) {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const router = useRouter();

  const { toast } = useToast();

  const form = useForm<EditChapterAccessType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      isFree: Boolean(chapter.isFree),
      id: chapter.id,
    },
  });

  const handleEdit = () => {
    setIsEdit((prev) => !prev);
  };

  async function onSubmit(values: EditChapterAccessType) {
    const data = await editChapterAccess(values);

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
          <h3 className="text-lg font-medium">Chapter access</h3>

          <Button
            onClick={handleEdit}
            variant={"ghost"}
            className="text-slate-700 "
          >
            {isEdit ? (
              "Cancel"
            ) : (
              <div className="flex items-center gap-1">
                <Edit size={16} /> Edit chapter access
              </div>
            )}
          </Button>
        </div>
        {isEdit ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="isFree"
                render={({ field }) => (
                  <FormItem className="flex gap-2 items-center">
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      id="isFree"
                    />
                    <label
                      htmlFor="isFree"
                      className="text-sm  leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-slate-800"
                    >
                      Mark this as if you want to make this chapter for public
                    </label>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="mt-4">
                Save
              </Button>
            </form>
          </Form>
        ) : chapter.isFree ? (
          <h2 className="text-lg text-slate-800">Free chapter access</h2>
        ) : (
          <h2 className="text-lg text-slate-800">Private chapter access</h2>
        )}
      </div>
    </div>
  );
}
export default EditChapterAccess;
