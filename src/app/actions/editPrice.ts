"use server";

import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/authOptions";
import { EditPriceType } from "../(dashboard)/(routes)/teacher/courses/[courseId]/_components/EditPrice";

export const editPrice = async (values: EditPriceType) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return { success: false, message: "Price failed to update" };
    }

    await prisma.course.update({
      where: {
        id: values.id,
      },
      data: {
        price: values.price,
      },
    });

    return { success: true, message: "Price updated successfully" };
  } catch (error) {
    return { success: false, message: "Price failed to update" };
  }
};
