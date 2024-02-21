import IconWrapper from "@/components/globals/IconWrapper";
import authOptions from "@/lib/authOptions";
import prisma from "@/lib/prisma";
import { ClipboardList, LayoutDashboard } from "lucide-react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import EditTitle from "./_components/EditTitle";
import EditDescription from "./_components/EditDescription";
import EditImage from "./_components/EditImage";
import EditCategory from "./_components/EditCategory";
import { FaMoneyBill } from "react-icons/fa";
import EditPrice from "./_components/EditPrice";
async function CoursePage({ params }: { params: { courseId: string } }) {
  const course = await prisma.course.findUnique({
    where: {
      id: params.courseId,
    },
  });

  const categories = await prisma.category.findMany();

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
    <div className="p-5 my-4 ">
      <div className="mb-10">
        <h2 className="text-2xl font-semibold">Course Setup</h2>
        <p className="text-slate-700">
          Complete all fields {textCompletedText}
        </p>
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
          <div>TODO ...*</div>
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
        </div>
      </div>
    </div>
  );
}

export default CoursePage;
