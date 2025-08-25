"use client";
import { useUploadThing } from "@/utils/uploadthing";
import UploadFormInput from "./upload-form-input";
import { z } from "zod";
import { toast } from "sonner";
import { generatePdfSummary, storePdfSummary } from "@/actions/upload-action";
import { useEffect, useState } from "react";

const schema = z.object({
  file: z
    .instanceof(File)
    .refine((file) => ["application/pdf"].includes(file.type), {
      message: "Invalid document file type",
    })
    .refine(
      (file) => file.size <= 20 * 1024 * 1024,
      "File must be less than 20MB"
    ),
});

export default function UploadForm() {
  const [fSummary, setFSummary] = useState<{ success: boolean; data?: any } | null>(null);

  const { startUpload } = useUploadThing("pdfUploader", {
    onClientUploadComplete: (res) => {
      console.log("File uploaded successfully", res);
      if (res?.[0]) {
        console.log("📄 File URL (ufs):", res[0].ufsUrl);
      }
      toast.success("File uploaded successfully");
    },
    onUploadError: (err) => {
      console.error("Error while uploading", err);
      toast.error("Upload failed. Please try again.");
    },
    onUploadBegin: (fileName) => {
      console.log("File began to upload", fileName);
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitted");

    const formData = new FormData(e.currentTarget);
    const file = formData.get("file") as File;

    const validatedFields = schema.safeParse({ file });
    if (!validatedFields.success) {
      const error = validatedFields.error.format();
      console.log(error.file?._errors[0] ?? "Invalid file");
      toast.error("Invalid file. Please upload a valid PDF.");
      return;
    }

    toast.info("Uploading PDF...", {
      description: "Hang on for a while",
    });

    const res = await startUpload([file]);
    if (!res || res.length === 0) {
      toast.warning("Something went wrong", {
        description: "Please use a correct file",
      });
      return;
    }

    // Generate summary
    const result = await generatePdfSummary(res as any);
    const { data = null, message = null } = result || {};

    if (data) {
      toast.info("Saving PDF...", {
        description: "Hang on, we are saving your PDF...",
      });

      // Store summary in DB
      await storePdfSummary({
        summary: data.pdfText,
        ufsUrl: res[0].ufsUrl,
        title: data.fileName ?? "Untitled",
        fileName: file.name,
      });
    } else {
      toast.error("Failed to generate summary", {
        description: message ?? "Please try again later",
      });
    }

    console.log({ result });
    setFSummary(result);
  };

  useEffect(() => {
    if (fSummary?.success) {
      const timer = setTimeout(() => {
        toast.info("Processing PDF...", {
          description: "Hang on, our AI is doing its job...",
        });
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [fSummary]);

  return (
    <div className="flex flex-col gap-8 mx-auto max-w-2xl w-full">
      <UploadFormInput onSubmit={handleSubmit} />
    </div>
  );
}
