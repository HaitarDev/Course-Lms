"use server";

import authOptions from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";

interface Props {
  chapterId: string;
  courseId: string;
}
export const publishChapter = async ({ chapterId, courseId }: Props) => {
  const session = await getServerSession(authOptions);
  const currCourse = await prisma.course.findUnique({
    where: {
      id: courseId,
    },
  });
  const currChapter = await prisma.chapter.findUnique({
    where: {
      id: chapterId,
    },
  });

  if (!currCourse || !session?.user.id)
    return {
      success: false,
      message: "User or Course or Chapter not found ",
    };

  if (
    !currChapter?.title ||
    !currChapter?.description ||
    !currChapter?.videoUrl
  )
    return {
      success: false,
      message: "You are not accomplished with this chapter yet",
    };

  await prisma.chapter.update({
    where: {
      id: chapterId,
      courseId,
    },
    data: {
      isPublished: true,
    },
  });

  return {
    success: true,
    message: "Chapter published successfully",
  };
};
