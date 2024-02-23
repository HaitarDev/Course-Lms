"use client";
import { Chapter } from "@prisma/client";

import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "@hello-pangea/dnd";
import { Grip, Pen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { reOrderChapters } from "@/app/actions/reOrderChapters";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

interface Props {
  chapters: Chapter[];
  courseId: string;
}

interface Items {
  id: string;
  position: number;
}
export interface ReOrderType {
  chapters: Items[];
  courseId: string;
}

function ChapterList({ chapters, courseId }: Props) {
  const [useChapters, setChapters] = useState(chapters);

  const router = useRouter();
  const { toast } = useToast();
  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(chapters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const startIndex = Math.min(result.source.index, result.destination.index);
    const endIndex = Math.max(result.source.index, result.destination.index);

    const updatedChapters = items.slice(startIndex, endIndex + 1);

    setChapters(items);

    const bulkUpdateData: Items[] = updatedChapters.map((chapter) => ({
      id: chapter.id,
      position: items.findIndex((item) => item.id === chapter.id),
    }));

    reOrder(bulkUpdateData);
  };

  const reOrder = async (chapters: Items[]) => {
    try {
      const data = await reOrderChapters({ chapters, courseId });

      if (!data?.success) {
        return toast({
          variant: "destructive",
          description: data?.message,
        });
      }

      if (data?.success) {
        toast({
          description: data?.message,
          color: "red",
        });

        router.refresh();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (chapterId: string) => {
    router.push(`/teacher/courses/${courseId}/edit-chapter/${chapterId}`);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="chapters">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="flex flex-col gap-3"
          >
            {useChapters.map((chapter, index) => (
              <Draggable
                draggableId={chapter.id}
                index={index}
                key={chapter.id}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <div className="rounded-md bg-slate-200 flex justify-between items-center px-2 py-3 group shadow-md">
                      <div className="flex items-center gap-3 ">
                        <Grip className="w-5 h-5 text-slate-700  group-active:text-primary" />
                        <h3 className="text-sm font-medium leading-6">
                          {chapter.title}
                        </h3>
                        {chapter.isFree ? (
                          <Badge className="bg-emerald-500 hover:bg-emerald-500">
                            free
                          </Badge>
                        ) : null}
                      </div>
                      <div className="flex items-center gap-2">
                        {chapter.isPublished ? (
                          <Badge>Published</Badge>
                        ) : (
                          <Badge className="bg-gray-500 hover:bg-gray-500">
                            Draft
                          </Badge>
                        )}

                        <Pen
                          className="w-5 h-4 text-slate-700 hover:text-black"
                          onClick={() => handleEdit(chapter.id)}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </Draggable>
            ))}

            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
export default ChapterList;
