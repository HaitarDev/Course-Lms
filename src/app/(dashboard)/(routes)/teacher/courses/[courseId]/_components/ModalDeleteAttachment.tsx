"use client";

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
import { useToast } from "@/components/ui/use-toast";
import { ReactNode } from "react";

interface Props {
  handleDelete: () => void;
  children: ReactNode;
}
export default function ModalDelete({ handleDelete, children }: Props) {
  const router = useRouter();
  const { toast } = useToast();

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Are you sure ? </DialogTitle>
          <DialogDescription>
            You cant undo this move, make sure before press yes !
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="sm:justify-start">
          <Button type="submit" variant="default" onClick={handleDelete}>
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
