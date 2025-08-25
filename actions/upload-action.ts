"use server";

import { getData } from "@/lib/db";
import { fetchAndExtractPdfText } from "@/lib/langchain";
import { auth } from "@clerk/nextjs/server";
import type { ClientUploadedFileData } from "uploadthing/types";

interface PdfSavedSummary {
  userId: string;
  fileName: string;
  summary: string;
  title: string;
  ufsUrl: string;
}

export async function generatePdfSummary(
  uploadResponse: [
    ClientUploadedFileData<{
      userId: string;
      file: {
        ufsUrl: string;
        name: string;
      };
    }>
  ]
) {
  const { serverData, ufsUrl, name: fileName } = uploadResponse[0];
  const userId = serverData?.userId;

  if (!ufsUrl) {
    return {
      success: false,
      message: "File URL missing",
      data: null,
    };
  }

  try {
    const pdfText = await fetchAndExtractPdfText(ufsUrl);
    return {
  success: true,
  message: "PDF processed",
  data: {
    fileName,
    pdfText,
    userId,
    ufsUrl,
    title: fileName.replace(".pdf", ""), 
    summary: pdfText.slice(0, 300), 
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

async function savePDFSummary({
  userId,
  fileName,
  summary,
  title,
  ufsUrl,
}: PdfSavedSummary) {
  try {
    const sql = await getData();
    const [saved] = await sql`
      INSERT INTO pdf_summaries (
        user_id,
        original_file_url,
        summary_text,
        status,
        title,
        file_name
      ) VALUES (
        ${userId},
        ${ufsUrl},
        ${summary},
        'processed',
        ${title},
        ${fileName}
      )
      RETURNING id, user_id, file_name, title
    `;

    return saved;
  } catch (error) {
    console.error("Error saving the summary:", error);
    return null;
  }
}

export async function storePdfSummary({
  fileName,
  summary,
  title,
  ufsUrl,
}: Omit<PdfSavedSummary, "userId">) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return {
        success: false,
        message: "User not found",
      };
    }

    const saved = await savePDFSummary({
      userId,
      fileName,
      summary,
      title,
      ufsUrl,
    });

    if (!saved) {
      return {
        success: false,
        message: "Failed to save summary",
      };
    }

    return {
      success: true,
      message: "Your PDF summary was saved successfully",
      data: saved,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Error while saving the PDF summary",
    };
  }
}
