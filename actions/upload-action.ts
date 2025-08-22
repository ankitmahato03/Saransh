"use server";

import { fetchAndExtractPdfText } from "@/lib/langchain";
import type { ClientUploadedFileData } from "uploadthing/types";

export async function generatePdfSummry(
  uploadResponse: [
    ClientUploadedFileData<{
      userId: string;
      file: {
        ufsUrl: any;
        name: string;
      };
    }>
  ]
) {
const {
  serverData: { userId },
  ufsUrl: ufsUrl,
  name: fileName,
} = uploadResponse[0];


  if (!ufsUrl) {
    return {
      success: false,
      message: "File URL missing",
      data: null,
    };
  }

  try {
    const pdfText = await fetchAndExtractPdfText(ufsUrl); // <-- your logic here
    return {
      success: true,
      message: "PDF processed",
      data: {
        fileName,
        pdfText,
        userId,
      },
    };
  } catch (err) {
    return {
      success: false,
      message: "PDF processing failed",
      data: null,
    };
  }
}
