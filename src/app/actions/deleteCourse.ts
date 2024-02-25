"use server";

import authOptions from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { UTApi } from "uploadthing/server";

export const deleteCourse = async (courseId: string) => {
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

  if (currCourse.chapters.length > 0) {
    const UTapi = new UTApi();

    for (let chapter of currCourse.chapters) {
      if (chapter.videoUrl) {
        const newUrl = chapter.videoUrl.substring(
          chapter.videoUrl.lastIndexOf("/") + 1
        );

        await UTapi.deleteFiles(newUrl);
      }

      await prisma.chapter.delete({
        where: {
          id: chapter.id,
          courseId,
        },
      });
    }
  }

  await prisma.course.delete({
    where: {
      id: courseId,
    },
  });

  return {
    success: true,
    message: "Chapter deleted successfully",
  };
};
