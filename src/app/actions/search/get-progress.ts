"use server";
import prisma from "@/lib/prisma";

export const getProgress = async (userId: String, courseId: String) => {
  try {
    const publishedChapters = await prisma.chapter.findMany({
      where: {
        courseId: courseId,
        isPublished: true,
      },
      select: { id: true },
    });

    const publishedChapterIds = publishedChapters.map((chapter) => chapter.id);
    const progress = await prisma.userProgress.findMany({
      where: {
        userId: userId,
        chapterId: {
          in: publishedChapterIds,
        },
        isCompleted: true,
      },
    });

    const progressPercentage = (progress / publishedChapterIds.length) * 100;

    return progressPercentage;
  } catch (error) {
    console.log("[GET_PROGRESS]", error);
  }
};
