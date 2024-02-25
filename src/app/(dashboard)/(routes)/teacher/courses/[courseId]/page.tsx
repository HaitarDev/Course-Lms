import IconWrapper from "@/components/globals/IconWrapper";
import authOptions from "@/lib/authOptions";
import prisma from "@/lib/prisma";
import {
  ArrowLeftIcon,
  ClipboardList,
  File,
  LayoutDashboard,
  MessageSquareWarningIcon,
} from "lucide-react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import EditTitle from "./_components/EditTitle";
import EditDescription from "./_components/EditDescription";
import EditImage from "./_components/EditImage";
import EditCategory from "./_components/EditCategory";
import { FaMoneyBill } from "react-icons/fa";
import EditPrice from "./_components/EditPrice";
import EditAttachment from "./_components/EditAttachment";
import EditChapter from "./_components/EditChapter";
import { unstable_noStore } from "next/cache";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import PublishedCourse from "./_components/PublishedCourse";
async function CoursePage({ params }: { params: { courseId: string } }) {
  unstable_noStore();

  const course = await prisma.course.findUnique({
    where: {
      id: params.courseId,
    },
    include: {
      attachments: {
        orderBy: {
          createdAt: "desc",
        },
      },
      chapters: {
        orderBy: {
          position: "desc",
        },
      },
    },
  });
  const categories = await prisma.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  if (!course) return redirect("/");

  const session = await getServerSession(authOptions);

  if (!session?.user) return redirect("/");

  const fieldsToComplete = [
    course.title,
    course.description,
    course.imageUrl,
    course.isPublished,
    course.price,
    course.attachments.length !== 0,
  ];

  const totalFields = fieldsToComplete.length;
  // here we filter based on completed tasks
  const completedFields = fieldsToComplete.filter(
    (field) =>
      field !== null && field !== undefined && field !== "" && field !== false
  ).length;

  const textCompletedText = `(${completedFields}/${totalFields})`;

  return (
    <div>
      {!course.isPublished ? (
        <div className="h-12 px-4 py-6 flex items-center gap-3 text-sm text-yellow-900 bg-yellow-200 border-b-2 border-yellow-300">
          <>
            <MessageSquareWarningIcon className="w-5" />
          </>
          <p>
            This course is unpublished , it will not be visible to the public
          </p>
        </div>
      ) : null}

      <div className="p-5 my-4">
        <div className="mb-10 flex items-center justify-between ">
          <div className="">
            <h2 className="text-2xl font-semibold">Course Setup</h2>
            <p className="text-slate-700">
              Complete all fields {textCompletedText}
            </p>
          </div>
          <div>
            <PublishedCourse course={course} />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-x-32 md:grid-cols-2 w-full">
          {/* grid */}
          <div>
            <div className="flex items-center gap-2">
              <IconWrapper icon={<LayoutDashboard />} size="lg" />
              <h2 className="text-xl text-slate-800">Customize your course</h2>
            </div>

            <div>
              <EditTitle course={course} />
              <EditDescription course={course} />
              <EditImage course={course} />
              <EditCategory
                course={course}
                categories={categories.map((cat) => ({
                  label: cat.name,
                  value: cat.id,
                }))}
              />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <IconWrapper icon={<ClipboardList />} size="lg" />
              <h2 className="text-xl text-slate-800">Course chapters</h2>
            </div>
            <div>
              <EditChapter course={course} />
            </div>
            <div className="flex items-center gap-2">
              <IconWrapper
                icon={<FaMoneyBill width={300} className="text-2xl" />}
                size="lg"
              />
              <h2 className="text-xl text-slate-800">Sell your course</h2>
            </div>
            <div>
              <EditPrice course={course} />
            </div>
            <div className="flex items-center gap-2">
              <IconWrapper icon={<File />} size="lg" />
              <h2 className="text-xl text-slate-800">
                Resources & Attachments
              </h2>
            </div>
            <div>
              <EditAttachment course={course} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CoursePage;
