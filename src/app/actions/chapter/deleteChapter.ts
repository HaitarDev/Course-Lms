"use server";

import authOptions from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { UTApi } from "uploadthing/server";

interface Props {
  chapterId: string;
  courseId: string;
}
export const deleteChapter = async ({ chapterId, courseId }: Props) => {
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

  if (!currChapter || !currCourse || !session?.user.id)
    return {
      success: false,
      message: "User or Course or Chapter not found ",
    };

  // delete  videos first
  if (currChapter.videoUrl) {
    const utapi = new UTApi();

    const newUrl = currChapter.videoUrl.substring(
      currChapter.videoUrl.lastIndexOf("/") + 1
    );

    console.log(newUrl);

    await utapi.deleteFiles(newUrl);
  }

  await prisma.chapter.delete({
    where: {
      id: chapterId,
      courseId,
    },
  });

  return {
    success: true,
    message: "Chapter deleted successfully",
  };
};
