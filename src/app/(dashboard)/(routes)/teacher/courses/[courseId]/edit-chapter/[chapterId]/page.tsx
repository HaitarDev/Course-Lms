import IconWrapper from "@/components/globals/IconWrapper";
import prisma from "@/lib/prisma";
import { EyeIcon, LayoutDashboard } from "lucide-react";
import EditChapterTitle from "../_components/EditChapterTitle";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/authOptions";
import EditChapterDescription from "../_components/EditChapterDescription";
import EditChapterAccess from "../_components/EditChapterAccess";

async function ChapterPage({
  params,
}: {
  params: { chapterId: string; courseId: string };
}) {
  const chapter = await prisma.chapter.findUnique({
    where: {
      id: params.chapterId,
      courseId: params.courseId,
    },
  });

  if (!chapter) return redirect("/");

  const session = await getServerSession(authOptions);

  if (!session?.user) return redirect("/");

  const completedFields = [
    chapter?.title,
    chapter?.description,
    chapter?.isPublished,
    chapter?.videoUrl,
  ];

  const totalFields = completedFields.length;

  const completedFieldCount = completedFields.filter(
    (field) =>
      field !== null && field !== undefined && field !== "" && field !== false
  );

  const textCompletedText = `(${completedFieldCount.length}/${totalFields})`;

  return (
    <div className="p-5 my-4 ">
      <div className="mb-10">
        <h2 className="text-2xl font-semibold">Chapter Setup</h2>
        <p className="text-slate-700">
          Complete all fields {textCompletedText}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-x-32 md:grid-cols-2 w-full">
        {/* grid */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <IconWrapper icon={<LayoutDashboard />} size="lg" />
            <h2 className="text-xl text-slate-800">Customize your course</h2>
          </div>

          <div>
            <EditChapterTitle chapter={chapter} />
            <EditChapterDescription chapter={chapter} />
          </div>
          <div className="flex items-center gap-2">
            <IconWrapper icon={<EyeIcon />} size="lg" />
            <h2 className="text-xl text-slate-800">Access settings</h2>
          </div>

          <div>
            <EditChapterAccess chapter={chapter} />
          </div>
        </div>
        <div>{/* grid 2  */}</div>
      </div>
    </div>
  );
}
export default ChapterPage;
