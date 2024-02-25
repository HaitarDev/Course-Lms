"use server";

import authOptions from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";

export const unpublishCourse = async (courseId: string) => {
  const session = await getServerSession(authOptions);
  const currCourse = await prisma.course.findUnique({
    where: {
      id: courseId,
    },
  });

  await prisma.course.update({
    where: {
      id: courseId,
    },
    data: {
      isPublished: false,
    },
  });

  return {
    success: true,
    message: "Chapter unpublished successfully",
  };
};
