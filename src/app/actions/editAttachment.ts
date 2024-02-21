"use server";

import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/authOptions";
import { EditAttachmentType } from "../(dashboard)/(routes)/teacher/courses/[courseId]/_components/EditAttachment";

export const editAttachment = async (values: EditAttachmentType) => {
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

    await prisma.attachment.create({
      data: {
        name: values.url.split("/")[0],
        url: values.url,
        courseId: values.courseId,
      },
    });
    return { success: true, message: "Attachment updated successfully" };
  } catch (error) {
    return { success: false, message: "Attachment failed to update" };
  }
};
