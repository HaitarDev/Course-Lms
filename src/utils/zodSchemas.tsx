import { z } from "zod";

export const createCourseSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
});
