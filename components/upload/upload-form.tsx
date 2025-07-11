"use client";

import UploadFormInput from "./upload-form-input";
import { z } from "zod";

const fileSchema = z.file();

fileSchema.max(20 * 1024 * 1024); // maximum .size (bytes)
fileSchema.mime(["application/pdf"]);

export default function UploadForm() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitted");
    const formData = new FormData(e.currentTarget);
    const file = formData.get("file") as File;

    const validatedFeilds = fileSchema.safeParse(file);
    console.log(validatedFeilds);
    if (!validatedFeilds.success) {
      console.log(validatedFeilds.error.format()._errors[0] ?? "Invalid File");
    }
  };
  return (
    <div className="flex flex-col gap-8 mx-auto max-w-2xl w-full">
      <UploadFormInput onSubmit={handleSubmit} />
    </div>
  );
}
