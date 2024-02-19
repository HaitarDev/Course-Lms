"use server";

import { FormType } from "../(dashboard)/_components/CreateCourseForm";
import prisma from "@/lib/prisma";

export const createCourse = async (values: FormType) => {
  try {
    const data = await prisma?.course.create({
      data: {
        title: values.title,
        userId: values.userId,
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
