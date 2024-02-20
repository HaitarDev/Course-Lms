import authOptions from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

const auth = async () => {
  const session = await getServerSession(authOptions);
  if (session?.user) return session.user.id;
  else {
    throw new Error("Unauthorized");
  }
};

const handleMiddleware = async () => {
  const userId = await auth();
  if (!userId) throw new UploadThingError("Unauthorized");
  return { userId };
};

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  courseImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    // Set permissions and file types for this FileRoute
    .middleware(handleMiddleware)
    .onUploadComplete(() => {}),

  courseAttachment: f(["text", "image", "pdf", "video", "audio"])
    .middleware(handleMiddleware)
    .onUploadComplete(() => {}),

  courseChapterVideo: f({ video: { maxFileSize: "512GB", maxFileCount: 1 } })
    .middleware(handleMiddleware)
    .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
