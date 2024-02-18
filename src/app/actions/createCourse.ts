"use server";

import { FormType } from "../(dashboard)/_components/CreateCourseForm";
import prisma from "@/lib/prisma";

export const createCourse = async (values: FormType) => {
  try {
    await prisma?.course.create({
      data: {
        title: values.title,
        userId: values.userId,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
