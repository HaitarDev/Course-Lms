"use server";

import { EditCategoryType } from "../(dashboard)/(routes)/teacher/courses/[courseId]/_components/EditCategory";

import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/authOptions";

export const editCategory = async (values: EditCategoryType) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return { success: false, message: "Category failed to update" };
    }

    await prisma.course.update({
      where: {
        id: values.id,
      },
      data: {
        categoryId: values.categoryId,
      },
    });

    return { success: true, message: "Category updated successfully" };
  } catch (error) {
    return { success: false, message: "Category failed to update" };
  }
};
