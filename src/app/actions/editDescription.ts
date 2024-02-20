"use server";

import { EditDescriptionType } from "../(dashboard)/(routes)/teacher/courses/[courseId]/_components/EditDescription";

import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/authOptions";

export const editDescription = async (values: EditDescriptionType) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return { success: false, message: "Title failed to update" };
    }

    await prisma.course.update({
      where: {
        id: values.id,
      },
      data: {
        description: values.description,
      },
    });

    return { success: true, message: "Title updated successfully" };
  } catch (error) {
    return { success: false, message: "Title failed to update" };
  }
};
