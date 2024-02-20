"use server";

import { EditImageType } from "../(dashboard)/(routes)/teacher/courses/[courseId]/_components/EditImage";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/authOptions";

export const editImage = async (values: EditImageType) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return { success: false, message: "Image failed to update" };
    }

    await prisma.course.update({
      where: {
        id: values.id,
      },
      data: {
        imageUrl: values.image,
      },
    });

    return { success: true, message: "Image updated successfully" };
  } catch (error) {
    return { success: false, message: "Image failed to update" };
  }
};
