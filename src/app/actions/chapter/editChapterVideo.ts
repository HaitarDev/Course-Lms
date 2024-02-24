"use server";

import Mux from "@mux/mux-node";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/authOptions";
import { EditVideoType } from "@/app/(dashboard)/(routes)/teacher/courses/[courseId]/edit-chapter/_components/EditChapterVideo";
import { UTApi } from "uploadthing/server";

const { video } = new Mux({
  tokenId: process.env.MUX_TOKEN_ID!,
  tokenSecret: process.env.MUX_TOKEN_SECRET!,
});
// Use video here

export const editChapterVideo = async (values: EditVideoType) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return { success: false, message: "Image failed to update" };
    }

    const course = await prisma.course.findUnique({
      where: {
        id: values.courseId,
        userId: session.user.id,
      },
    });

    if (!course) return { success: false, message: "Course not found" };

    // check if already video url ,
    if (values.videoUrl) {
      const existingVideo = await prisma.chapter.findUnique({
        where: {
          id: values.id,
          courseId: values.courseId,
        },
        select: {
          videoUrl: true,
        },
      });

      if (existingVideo?.videoUrl) {
        const utapi = new UTApi();
        const newUrl = existingVideo.videoUrl.substring(
          existingVideo.videoUrl.lastIndexOf("/") + 1
        );
        console.log(newUrl);
        await utapi.deleteFiles(newUrl);
        await prisma.chapter.update({
          where: {
            id: values.id,
            courseId: values.courseId,
          },
          data: {
            videoUrl: values.videoUrl,
          },
        });
      }

      await prisma.chapter.update({
        where: {
          id: values.id,
          courseId: values.courseId,
        },
        data: {
          videoUrl: values.videoUrl,
        },
      });
      // const existingMuxData = await prisma.muxData.findFirst({
      //   where: {
      //     chapterId: values.id,
      //   },
      // });

      // if (existingMuxData) {
      //   await video.assets.delete(existingMuxData.assetId!);
      //   await prisma.muxData.delete({
      //     where: {
      //       id: existingMuxData.id,
      //     },
      //   });
      // }

      // const asset = await video.assets.create({
      //   input: values.videoUrl,
      //   playback_policy: "public",
      //   test: false,
      // });

      // await prisma.muxData.create({
      //   data: {
      //     chapterId: values.id,
      //     assetId: asset.id,
      //     playbackId: asset.playback_ids ? [0].id! : "",
      //   },
      // });
    }

    return { success: true, message: "Image updated successfully" };
  } catch (error) {
    return { success: false, message: "Image failed to update" };
  }
};
