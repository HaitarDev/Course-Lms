import IconWrapper from "@/components/globals/IconWrapper";
import prisma from "@/lib/prisma";
import {
  ArrowLeftIcon,
  EyeIcon,
  LayoutDashboard,
  MessageSquareWarningIcon,
  Video,
} from "lucide-react";
import EditChapterTitle from "../_components/EditChapterTitle";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/authOptions";
import EditChapterDescription from "../_components/EditChapterDescription";
import EditChapterAccess from "../_components/EditChapterAccess";
import EditChapterVideo from "../_components/EditChapterVideo";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import PublishedActions from "../_components/PublishedActions";

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
    include: {
      muxData: true,
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
    <div>
      {!chapter.isPublished ? (
        <div className="h-12 px-4 py-6 flex items-center gap-3 text-sm text-yellow-900 bg-amber-300/90 border-b-2 border-amber-500">
          <>
            <MessageSquareWarningIcon />
          </>
          <p>
            This chapter is unpublished , it will not be visible in the course
          </p>
        </div>
      ) : null}
      <Button asChild variant={"ghost"} className="mt-2">
        <Link href={`/teacher/courses/${params.courseId}`}>
          <ArrowLeftIcon className="w-4" /> Go back to the course
        </Link>
      </Button>
      <div className="p-5">
        <div className="mb-10 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-semibold">Chapter Setup</h2>
            <p className="text-slate-700">
              Complete all fields {textCompletedText}
            </p>
          </div>
          <div>
            <PublishedActions chapter={chapter} courseId={params.courseId} />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-x-32 gap-y-4 md:grid-cols-2 w-full">
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
          {/* grid 2  */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <IconWrapper icon={<Video />} size="lg" />
              <h2 className="text-xl text-slate-800">Add a video</h2>
            </div>

            <div>
              <EditChapterVideo chapter={chapter} courseId={params.courseId} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ChapterPage;
