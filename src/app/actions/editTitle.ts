"use server";

import { EditTitleType } from "../(dashboard)/(routes)/teacher/courses/[courseId]/_components/EditTitle";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/authOptions";

export const editTitle = async (values: EditTitleType) => {
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
        title: values.title,
      },
    });
    console.log(12);
    return { success: true, message: "Title updated successfully" };
  } catch (error) {
    return { success: false, message: "Title failed to update" };
  }
};
