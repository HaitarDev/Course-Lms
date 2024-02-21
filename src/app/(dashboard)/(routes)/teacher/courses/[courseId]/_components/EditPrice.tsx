"use client";

import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Course } from "@prisma/client";
import { EditIcon, PlusCircle } from "lucide-react";
import { useState } from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

import { editPrice } from "@/app/actions/editPrice";
import { formatPrice } from "@/lib/format";

const formSchema = z.object({
  id: z.string(),
  price: z.coerce.number(),
});

export type EditPriceType = z.infer<typeof formSchema>;

function EditPrice({ course }: { course: Course }) {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const router = useRouter();

  const { toast } = useToast();

  const form = useForm<EditPriceType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: course.id,
      price: course.price ? course.price : undefined,
    },
  });

  const { formState } = form;
  const handleEdit = () => {
    setIsEdit((prev) => !prev);
  };

  async function onSubmit(values: EditPriceType) {
    console.log(values);
    const data = await editPrice(values);

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
          <h3 className="text-lg font-medium">Course Price</h3>

          <Button
            onClick={handleEdit}
            variant={"ghost"}
            className="text-slate-700 "
          >
            {!isEdit && !course.price && (
              <div className="flex items-center gap-1">
                <PlusCircle size={16} /> Add price
              </div>
            )}
            {!isEdit && course.price && (
              <div className="flex items-center gap-1">
                <EditIcon size={16} /> Edit price
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
                name="price"
                render={({ field }) => (
                  <>
                    <Input
                      {...field}
                      disabled={formState.isSubmitting}
                      placeholder="e.g. 99$"
                      type="number"
                      step={0.5}
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
        ) : course.price ? (
          <h2 className="text-lg text-slate-800">
            {formatPrice(course.price)}
          </h2>
        ) : (
          <h2 className="text-md text-slate-700 italic">No price yet</h2>
        )}
      </div>
    </div>
  );
}
export default EditPrice;
