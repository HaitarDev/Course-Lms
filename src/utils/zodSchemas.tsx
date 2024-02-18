import { z } from "zod";

export const createCourseSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  userId: z.string(),
});

export const signupUserSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(7, { message: "Password must be at least 7 characters" }),
});
