"use server";

import authOptions from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";

interface Props {
  chapterId: string;
  courseId: string;
}
export const unpublishChapter = async ({ chapterId, courseId }: Props) => {
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

  if (!currCourse || !session?.user.id || !currChapter)
    return {
      success: false,
      message: "User or Course or Chapter not found ",
    };

  await prisma.chapter.update({
    where: {
      id: chapterId,
      courseId,
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
