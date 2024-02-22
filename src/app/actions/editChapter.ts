"use server";

import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/authOptions";
import { EditChapterType } from "../(dashboard)/(routes)/teacher/courses/[courseId]/_components/EditChapter";

export const editChapter = async (values: EditChapterType) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return { success: false, message: "Attachment failed to update" };
    }

    const course = await prisma.course.findUnique({
      where: {
        id: values.courseId,
        userId: session.user.id,
      },
    });

    if (!course) return { success: false, message: "Course not found" };

    const lastChapter = await prisma.chapter.findFirst({
      where: {
        courseId: values.courseId,
        id: values.chapterId,
      },
      orderBy: {
        position: "desc",
      },
    });

    const position = lastChapter ? lastChapter.position + 1 : 1;

    await prisma.chapter.create({
      data: {
        title: values.title,
        courseId: values.courseId,
        position,
      },
    });
    return { success: true, message: "Attachment updated successfully" };
  } catch (error) {
    return { success: false, message: "Attachment failed to update" };
  }
};
