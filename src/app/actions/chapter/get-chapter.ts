import prisma from "@/lib/prisma";
import { Attachment, Chapter } from "@prisma/client";

interface GetChapterProps {
  userId: string;
  courseId: string;
  chapterId: string;
}

export const getChapter = async ({
  userId,
  chapterId,
  courseId,
}: GetChapterProps) => {
  try {
    const purchase = await prisma.purchase.findUnique({
      where: {
        courseId_userId: {
          userId,
          courseId,
        },
      },
    });

    const course = await prisma.course.findUnique({
      where: {
        isPublished: true,
        id: courseId,
      },
      select: {
        price: true,
      },
    });

    const chapter = await prisma.chapter.findUnique({
      where: {
        id: chapterId,
        isPublished: true,
      },
    });

    if (!chapter || !course) {
      throw new Error("Chapter or course not found");
    }

    let attachments: Attachment[] = [];
    let nextChapter: Chapter | null = null;
    let videoUrl: string | null = null;

    if (purchase) {
      attachments = await prisma.attachment.findMany({
        where: {
          courseId,
        },
      });
    }

    if (chapter.isFree || purchase) {
      videoUrl = chapter.videoUrl;

      nextChapter = await prisma.chapter.findFirst({
        where: {
          courseId,
          isPublished: true,
          position: {
            gt: chapter?.position,
          },
        },
        orderBy: {
          position: "asc",
        },
      });
    }

    const userProgress = await prisma.userProgress.findUnique({
      where: {
        chapterId_userId: {
          userId,
          chapterId,
        },
      },
    });

    return {
      chapter,
      course,
      videoUrl,
      attachments,
      nextChapter,
      userProgress,
      purchase,
    };
  } catch (error) {
    console.log(`[GET_CHAPTER]`, error);
    return {
      chapter: null,
      course: null,
      attachments: [],
      nextChapter: null,
      userProgress: null,
      purchase: null,
    };
  }
};
