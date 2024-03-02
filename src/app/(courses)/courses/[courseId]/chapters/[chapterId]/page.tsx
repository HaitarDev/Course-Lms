import { getChapter } from "@/app/actions/chapter/get-chapter";
import Banner from "@/components/globals/Banner";
import authOptions from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import VideoPlayer from "./_components/VideoPlayer";
import CourseEnrollBtn from "./_components/CourseEnrollBtn";
import { Separator } from "@/components/ui/separator";
import { File } from "lucide-react";
import MuxPlayer from "@mux/mux-player-react";

async function ChapterPage({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) {
  const session = await getServerSession(authOptions);

  if (!session?.user.id) return redirect("/");

  const {
    attachments,
    chapter,
    course,
    nextChapter,
    purchase,
    userProgress,
    videoUrl,
  } = await getChapter({
    userId: session?.user.id,
    chapterId: params.chapterId,
    courseId: params.courseId,
  });

  if (!chapter || !course) return redirect("/");

  const isLocked = !chapter.isFree && !purchase;
  const completedOnEnd = !!purchase && !userProgress?.isCompleted;

  return (
    <div>
      {userProgress?.isCompleted && (
        <Banner label="You already complited this chapter" />
      )}
      {isLocked && (
        <Banner label="You need to purchase this chapter to view it" />
      )}

      <div className="flex flex-col max-w-4xl mx-auto pb-20">
        <div className="p-4">
          <VideoPlayer
            chapterId={params.chapterId}
            title={chapter.title}
            courseId={params.courseId}
            nextChapterId={nextChapter?.id}
            playbackId={videoUrl!}
            isLocked={isLocked}
            completedOnEnd={completedOnEnd}
            videoUrl={videoUrl!}
          />
        </div>
        <div>
          <div className="p-4 flex flex-col md:flex-row items-center justify-between">
            <h2 className="text-2xl font-semibold mb-2"> {chapter.title}</h2>
            {purchase ? (
              <div>{/* add progrss btn */}</div>
            ) : (
              <CourseEnrollBtn
                courseId={params.courseId}
                price={course.price!}
              />
            )}
          </div>
          <Separator />
          <div>{chapter.description}</div>
        </div>
      </div>
      {!!attachments.length && (
        <>
          <Separator />
          <div className="p-4">
            {attachments.map((attachment) => (
              <a
                href={attachment.url}
                target="_blank"
                key={attachment.id}
                className="flex items-center p-3 w-full bg-sky-200 border text-sky-700 rounded-md hover:underline"
              >
                <File />
                <p className="line-clamp-1">{attachment.name}</p>
              </a>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
export default ChapterPage;
