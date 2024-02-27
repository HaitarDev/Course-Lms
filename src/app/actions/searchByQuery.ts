"use server";
import prisma from "@/lib/prisma";

export const searchByQuery = async (formData: FormData) => {
  const query = formData.get("query") as string;
  if (!query) return;

  const courses = await prisma.course.findMany({
    where: {
      title: query,
    },
  });

  console.log(courses);
};
