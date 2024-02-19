import IconWrapper from "@/components/globals/IconWrapper";
import { Button } from "@/components/ui/button";
import authOptions from "@/lib/authOptions";
import prisma from "@/lib/prisma";
import { Edit, LayoutDashboard } from "lucide-react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import EditTitle from "./_components/EditTitle";
async function CoursePage({ params }: { params: { courseId: string } }) {
  const course = await prisma.course.findUnique({
    where: {
      id: params.courseId,
    },
  });

  console.log(course);

  if (!course) return redirect("/");

  const session = await getServerSession(authOptions);

  if (!session?.user) return redirect("/");

  const fieldsToComplete = [
    course.title,
    course.description,
    course.imageUrl,
    course.isPublished,
    course.price,
  ];

  const totalFields = fieldsToComplete.length;
  // here we filter based on completed tasks
  const completedFields = fieldsToComplete.filter(
    (field) =>
      field !== null && field !== undefined && field !== "" && field !== false
  ).length;

  const textCompletedText = `(${completedFields}/${totalFields})`;

  return (
    <div className="p-5 mt-32 flex flex-col md:block">
      <div className="mb-10">
        <h2 className="text-2xl font-semibold">Course Setup</h2>
        <p className="text-slate-700">
          Complete all fields {textCompletedText}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <IconWrapper icon={<LayoutDashboard />} size="lg" />
        <h2 className="text-xl text-slate-800">Customize your course</h2>
      </div>
      {/* grid */}
      <EditTitle course={course} />
    </div>
  );
}

export default CoursePage;
