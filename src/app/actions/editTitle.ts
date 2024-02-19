"use server";

import { EditType } from "../(dashboard)/(routes)/teacher/courses/[courseId]/_components/EditTitle";
import prisma from "@/lib/prisma";

export const editTitle = async (values: EditType) => {
  try {
    console.log(12);
    const data = await prisma.course.update({
      where: {
        id: values.courseId,
      },
      data: {
        title: values.title,
      },
    });

    return { success: true, message: "Title updated successfully" };
  } catch (error) {
    return { success: false, message: "Title failed to update" };
  }
};
