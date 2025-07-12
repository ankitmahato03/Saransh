"use server";

import fetchAndExtractPdfText from "@/lib/langchain";

export async function generatePdfSummry(
  uploadResopnse: [
    {
      serverData: {
        userId: String;
        file: {
          url: String;
          name: String;
        };
      };
    }
  ]
) {
  if (!uploadResopnse) {
    return {
      success: false,
      message: "File Upload Fail",
      data: null,
    };
  }
  const {
    serverData: {
      userId,
      file: { url: pdfUrl, name: fileName },
    },
  } = uploadResopnse[0];

  if (!pdfUrl) {
    return {
      success: false,
      message: "File Upload Fail",
      data: null,
    };
  }

  try {
    const pdfText = await fetchAndExtractPdfText(pdfUrl);
  } catch (err) {
    return {
      success: false,
      message: "File Upload Fail",
      data: null,
    };
  }
}
