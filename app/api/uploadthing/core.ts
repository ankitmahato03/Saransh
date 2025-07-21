import { currentUser } from "@clerk/nextjs/server";
import { UploadThingError } from "uploadthing/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourfileRouter = {
  pdfUploader: f({ pdf: { maxFileSize: "32MB" } })
    .middleware(async ({ req }) => {
      //Get user Info
      const user = await currentUser();
      if (!user) throw new UploadThingError("unauthorize");
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("upload Completed for user iD", metadata.userId);
      console.log("file url", file.ufsUrl);
      return { userId: metadata.userId, file };
    }),
} satisfies FileRouter;

export type OurfileRouter = typeof ourfileRouter;
