"use client";

import UploadFormInput from "./upload-form-input";
import { z } from "zod";

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
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitted");
    const formData = new FormData(e.currentTarget);
    const file = formData.get("file");
    console.log(file)

    const validatedFeilds = schema.safeParse({file});
    console.log(validatedFeilds);
    if (!validatedFeilds.success) {
      const error = validatedFeilds.error.format();
    console.log(error.file?._errors[0] ?? "Invalid File");
    return;
    }
  };
  return (
    <div className="flex flex-col gap-8 mx-auto max-w-2xl w-full">
      <UploadFormInput onSubmit={handleSubmit} />
    </div>
  );
}
