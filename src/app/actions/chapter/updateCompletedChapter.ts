import authOptions from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";

export async function updateCompletedChapter(
  isCompleted: boolean | undefined,
  chapterId: string
) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user.id;
    console.log(122);
    if (!userId) {
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    const userProgress = await prisma.userProgress.upsert({
      where: {
        chapterId_userId: {
          userId,
          chapterId: chapterId,
        },
      },
      update: {
        isCompleted,
      },
      create: {
        userId,
        chapterId: chapterId,
        isCompleted,
      },
    });

    return {
      success: true,
      message: "Success",
      userProgress,
    };
  } catch (error) {
    return {
      success: false,
      message: `Something went wrong [UPDATE COMPLETED CHAPTER], ${error}`,
    };
  }
}
