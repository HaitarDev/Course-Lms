"use client";
import { createCourse } from "@/app/actions/createCourse";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createCourseSchema } from "@/utils/zodSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export type FormType = z.infer<typeof createCourseSchema>;
function CreateCourseForm() {
  const [error, setError] = useState("");
  const session = useSession();
  const router = useRouter();

  const user = session?.data?.user;

  const form = useForm<FormType>({
    resolver: zodResolver(createCourseSchema),
    defaultValues: {
      title: "",
      userId: user?.id,
    },
  });

  const onSubmit = async (values: FormType) => {
    setError("");
    const data = await createCourse(values);

    if (data?.success) {
      form.reset();
      router.push(`/teacher/courses/${data.data?.id}`);
    } else {
      setError(data?.message);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 w-full md:w-[600px] lg:w-full"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Course name</FormLabel>
              <FormControl>
                <Input placeholder="Digital Marketing ..." {...field} />
              </FormControl>
              <FormDescription>
                This is your public course name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="userId"
          render={({ field }) => (
            <FormItem hidden>
              <FormControl>
                <Input
                  placeholder="Digital Marketing ..."
                  {...field}
                  // value={user?.id}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <p className="text-red-500 text-sm">{error}</p>
        <div className="flex gap-2">
          <Button type="button" variant={"ghost"}>
            Cancel
          </Button>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
}
export default CreateCourseForm;
