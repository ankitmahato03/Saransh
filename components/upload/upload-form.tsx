"use client";

import { useUploadThing } from "@/utils/uploadthing";
import UploadFormInput from "./upload-form-input";
import { z } from "zod";
import { toast } from "sonner";
import { generatePdfSummry } from "@/actions/upload-action";

const schema = z.object({
  file: z
    .instanceof(File)
    .refine((file) => ["application/pdf"].includes(file.type), {
      message: "Invalid document file type",
    })
    .refine(
      (file) => file.size <= 20 * 1024 * 1024,
      "File Must be less than 20MB"
    ),
});

export default function UploadForm() {
  const { startUpload, routeConfig } = useUploadThing("pdfUploader", {
    onClientUploadComplete: (res) => {
      console.log("File Uploaded Successfully", res);
      console.log("📄 File URL (ufs):", res[0].ufsUrl);
      toast.success("File Uploaded Successfully");
    },
    onUploadError: (err) => {
      console.error("Error While Uploading", err);
      toast.error("Uploaded didnt went Successfully");
    },
    onUploadBegin: (fileName) => {
      console.log("File Begain to upload", fileName);
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitted");
    const formData = new FormData(e.currentTarget);
    const file = formData.get("file") as File;
    console.log(file);

    const validatedFeilds = schema.safeParse({ file });
    console.log(validatedFeilds);
    if (!validatedFeilds.success) {
      const error = validatedFeilds.error.format();
      console.log(error.file?._errors[0] ?? "Invalid File");
      toast.error("Error Occured");
      return;
    }

    toast.info("Uploading  PDF", {
      description: "Hang On for a while ",
    });

    const res = await startUpload([file]);
    if (!res || res.length === 0) {
      toast.warning("Something Went Wrong", {
        description: "Please use a correct file",
      });
      return;
    }

    toast.info("Processing PDF", {
      description: "Hang On, our AI is doing its job...",
    });

    // ✅ FIX: Pass only the first file wrapped in a tuple
    // const summery = await generatePdfSummry([res[0] ]);
    // console.log({ summery });

    // const fileData = res[0]?.serverData;
    const summery = await generatePdfSummry(res as any);
    console.log({ summery });
  };
  return (
    <div className="flex flex-col gap-8 mx-auto max-w-2xl w-full">
      <UploadFormInput onSubmit={handleSubmit} />
    </div>
  );
}
