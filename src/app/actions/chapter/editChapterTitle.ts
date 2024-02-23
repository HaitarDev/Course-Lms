"use server";

import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/authOptions";
import { EditChapterTitleType } from "@/app/(dashboard)/(routes)/teacher/courses/[courseId]/edit-chapter/_components/EditChapterTitle";

export const editChapterTitle = async (values: EditChapterTitleType) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return { success: false, message: " Title chapter failed to update" };
    }

    await prisma.chapter.update({
      where: {
        id: values.id,
      },
      data: {
        title: values.title,
      },
    });

    return { success: true, message: "Title chapter updated successfully" };
  } catch (error) {
    return { success: false, message: "Title chaptertle failed to update" };
  }
};
