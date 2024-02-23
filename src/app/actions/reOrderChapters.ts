"use server";

import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/authOptions";
import { ReOrderType } from "../(dashboard)/(routes)/teacher/courses/[courseId]/_components/ChapterList";

export const reOrderChapters = async ({ chapters, courseId }: ReOrderType) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return { success: false, message: "Attachment failed to update" };
    }

    const course = await prisma.course.findUnique({
      where: {
        id: courseId,
        userId: session.user.id,
      },
    });

    if (!course) return { success: false, message: "Course not found" };

    for (let item of chapters) {
      await prisma.chapter.update({
        where: {
          id: item.id,
        },
        data: { position: item.position },
      });
    }

    return { success: true, message: "Attachment updated successfully" };
  } catch (error) {
    return { success: false, message: "Attachment failed to update" };
  }
};
