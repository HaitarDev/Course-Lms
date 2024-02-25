"use server";

import authOptions from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";

export const publishCourse = async (courseId: string) => {
  const session = await getServerSession(authOptions);
  const currCourse = await prisma.course.findUnique({
    where: {
      id: courseId,
    },
    include: {
      chapters: true,
    },
  });

  if (!currCourse || !session?.user.id)
    return {
      success: false,
      message: "User or Course not found ",
    };

  if (!currCourse.chapters.some((chapter) => chapter.isPublished)) {
    return {
      success: false,
      message: "you have no published chapters yet !",
    };
  }

  if (
    !currCourse?.title ||
    !currCourse?.description ||
    !currCourse?.categoryId ||
    !currCourse?.imageUrl ||
    !currCourse?.price
  )
    return {
      success: false,
      message: "You are not accomplished this chapter yet",
    };

  await prisma.course.update({
    where: {
      id: courseId,
    },
    data: {
      isPublished: true,
    },
  });

  return {
    success: true,
    message: "Course published successfully",
  };
};
