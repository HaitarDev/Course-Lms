"use client";

import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import MuxPlayer from "@mux/mux-player-react";
import { Loader2, Lock } from "lucide-react";
import { useState } from "react";

interface Props {
  chapterId: string;
  playbackId: string;
  title: string;
  courseId: string;
  nextChapterId?: string;
  isLocked: boolean;
  completedOnEnd: boolean;
}
function VideoPlayer({
  chapterId,
  completedOnEnd,
  courseId,
  isLocked,
  playbackId,
  title,
  nextChapterId,
}: Props) {
  const [isReady, setIsReady] = useState(false);
  const { toast } = useToast();

  return (
    <div className="relative aspect-video">
      {!isReady && !isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
          <Loader2 className="h-8 w-8 animate-spin text-secondary" />
        </div>
      )}
      {isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800 flex-col gap-y-2 text-secondary">
          <Lock className="h-8 w-8" />
          <p className="text-sm">This chapter is locked</p>
        </div>
      )}

      {!isLocked && (
        <MuxPlayer
          title={title}
          className={cn(!isReady && "hidden")}
          onCanPlay={() => setIsReady(true)}
          onEnded={() => {}}
          autoPlay
          playbackId={playbackId}
        />
      )}
    </div>
  );
}
export default VideoPlayer;
