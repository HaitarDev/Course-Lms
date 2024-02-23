"use server";

import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/authOptions";
import { EditChapterDescription } from "@/app/(dashboard)/(routes)/teacher/courses/[courseId]/edit-chapter/_components/EditChapterDescription";

export const editChapterDescription = async (
  values: EditChapterDescription
) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return {
        success: false,
        message: " Description chapter failed to update",
      };
    }

    await prisma.chapter.update({
      where: {
        id: values.id,
      },
      data: {
        description: values.description,
      },
    });

    return {
      success: true,
      message: "Description chapter updated successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: "Description chaptertle failed to update",
    };
  }
};
