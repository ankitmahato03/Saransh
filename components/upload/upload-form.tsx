"use client";

import { useUploadThing } from "@/utils/uploadthing";
import UploadFormInput from "./upload-form-input";
import { z } from "zod";
import { toast } from "sonner";

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
    onClientUploadComplete: () => {
      console.log("File Uploaded Successfully");
      toast.success('File Uploaded Successfully')
    },
    onUploadError: (err) => {
      console.error("Error While Uploading", err);
      toast.error("Uploaded didnt went Successfully");
    },
    onUploadBegin: ({ file }) => {
      console.log("File Begain to upload", file);
      
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitted");
    const formData = new FormData(e.currentTarget);
    const file = formData.get("file");
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
    if (!res) {
      toast.warning("Something Went Wrong", {
      description: "Please USe a correct file ",
      
    });
      return;
    }
    
    if(file)
    toast.info("Processing PDF", {
      description: "Hang On Uor AI is Doign his Job",
      
    });
  };
  return (
    <div className="flex flex-col gap-8 mx-auto max-w-2xl w-full">
      <UploadFormInput onSubmit={handleSubmit} />
    </div>
  );
}
