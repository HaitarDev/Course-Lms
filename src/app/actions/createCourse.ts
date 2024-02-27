"use server";

import { getServerSession } from "next-auth";
import { FormType } from "../(dashboard)/_components/CreateCourseForm";
import prisma from "@/lib/prisma";
import authOptions from "@/lib/authOptions";

export const createCourse = async (values: FormType) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user.id)
      return {
        success: false,
        message: "Unauthorized",
      };

    const data = await prisma.course.create({
      data: {
        title: values.title,
        userId: session.user.id,
      },
    });

    return {
      success: true,
      message: "Course created successfully",
      data: { id: data.id },
    };
  } catch (error) {
    return { success: false, message: "Failed to create course" };
  }
};
