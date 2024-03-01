import authOptions from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import prisma from "@/lib/prisma";

async function SearchCoursePage({ params }: { params: { courseId: string } }) {
  const session = await getServerSession(authOptions);

  if (!session?.user.id) return redirect("/");

  const course = await prisma.course.findUnique({
    where: {
      id: params.courseId,
    },
    include: {
      chapters: {
        where: {
          isPublished: true,
        },
        orderBy: {
          position: "asc",
        },
      },
    },
  });

  if (!course) return redirect("/");

  return redirect(`/courses/${course.id}/chapters/${course?.chapters[0].id}`);
}
export default SearchCoursePage;
