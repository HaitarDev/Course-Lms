import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { deleteAttatchment } from "@/app/actions/deleteAttachment";
import { useToast } from "@/components/ui/use-toast";

interface Props {
  fileId: string;
  courseId: string;
}
export function ModalDeleteAttachment({ fileId, courseId }: Props) {
  const router = useRouter();
  const { toast } = useToast();
  const handleDeleteFile = async (fileId: string) => {
    const data = await deleteAttatchment(fileId, courseId);
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
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={"ghost"}
          className="rounded-full hover:bg-slate-200  hover:scale-125 duration-150 transition-all"
          type="button"
        >
          <X width={15} height={15} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Delete File</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this file ?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="sm:justify-start">
          <Button
            type="submit"
            variant="default"
            onClick={() => handleDeleteFile(fileId)}
          >
            Save
          </Button>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
