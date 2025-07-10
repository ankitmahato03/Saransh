"use client";

import UploadFormInput from "./upload-form-input";
import { file, z } from "zod";

const schema = z.object({
  file: z
    .instanceof(File, { message: "invalid File Type " })
    .refine(
      (file) => file.size <= 20 * 1024 * 1024,
      "File Must be less than 20MB"
    )
    .refine(
      (file) => file.type.startsWith("application/pdf"),
      "File Must be a"
    ),
});

export default function UploadForm() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitted");
    const formData = new FormData(e.currentTarget);
    const file = formData.get("file") as File;

    const validatedFeilds = schema.safeParse(file);
    if (!validatedFeilds.success) {
      console.log(
        validatedFeilds.error.flatten().fieldErrors.file?.[0] ?? "Invalid File"
      );
    }
  };
  return (
    <div className="flex flex-col gap-8 mx-auto max-w-2xl w-full">
      <UploadFormInput onSubmit={handleSubmit} />
    </div>
  );
}
