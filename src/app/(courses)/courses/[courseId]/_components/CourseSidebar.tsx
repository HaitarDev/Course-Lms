import authOptions from "@/lib/authOptions";
import { Chapter, Course, UserProgress } from "@prisma/client";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import CourseSidebarItem from "./CourseSidebarItem";
import prisma from "@/lib/prisma";

interface Props {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null;
    })[];
  };
  progressCount: number | undefined;
}

async function CourseSidebar({ course, progressCount }: Props) {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;
  if (!userId) {
    return redirect("/");
  }

  const purchase = await prisma?.purchase.findUnique({
    where: {
      courseId_userId: {
        userId: userId,
        courseId: course.id,
      },
    },
  });

  console.log(course);
  return (
    <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
      <div className="p-8 border-b flex flex-col">
        <h1 className="font-semibold">{course.title}</h1>
        {/* check purchase w/ progress */}
      </div>
      {course.chapters.map((chapter) => (
        <CourseSidebarItem
          key={chapter.id}
          id={chapter.id}
          label={chapter.title}
          isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
          courseId={course.id}
          isLocked={!chapter.isFree && !purchase}
        />
      ))}
    </div>
  );
}
export default CourseSidebar;
