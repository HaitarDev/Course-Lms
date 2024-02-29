import { ReactNode } from "react";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/authOptions";
import { redirect } from "next/navigation";
import { getProgress } from "@/app/actions/search/get-progress";
import CourseSidebar from "./_components/CourseSidebar";
import CourseNavbar from "./_components/CourseNavbar";

interface Props {
  children: ReactNode;
  params: {
    courseId: string;
  };
}
async function SearchCourseLayout({ children, params }: Props) {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;
  if (!userId) {
    return redirect("/");
  }

  const course = await prisma.course.findUnique({
    where: {
      id: params.courseId,
    },
    include: {
      chapters: {
        where: {
          isPublished: true,
        },
        include: {
          userProgress: {
            where: {
              userId,
            },
          },
        },
      },
    },
  });

  if (!course) {
    return (
      <div className="text-center text-slate-500 text-xl mt-28">
        Course not found!
      </div>
    );
  }

  const progress = await getProgress(userId, params.courseId);

  console.log(course);

  return (
    <div className="h-full ">
      <div className="h-20 md:pl-80 fixed inset-y-0 w-full z-50">
        <CourseNavbar course={course} progressCount={progress} />
      </div>
      <div className="hidden md:flex h-full w-80 flex-col fixed  z-50">
        <CourseSidebar course={course} progressCount={progress} />
      </div>

      <main className="md:pl-80 pt-20 h-full">{children}</main>
    </div>
  );
}
export default SearchCourseLayout;
