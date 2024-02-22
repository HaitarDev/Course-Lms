"use server";

import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/authOptions";

export const deleteAttatchment = async (fileId: string, courseId: string) => {
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

    await prisma.attachment.delete({
      where: {
        id: fileId,
        courseId: courseId,
      },
    });
    return { success: true, message: "Attachment updated successfully" };
  } catch (error) {
    return { success: false, message: "Attachment failed to update" };
  }
};
