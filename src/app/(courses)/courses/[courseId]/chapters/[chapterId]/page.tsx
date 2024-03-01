import { getChapter } from "@/app/actions/chapter/get-chapter";
import Banner from "@/components/globals/Banner";
import authOptions from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import VideoPlayer from "./_components/VideoPlayer";

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
          />
        </div>
      </div>
    </div>
  );
}
export default ChapterPage;
