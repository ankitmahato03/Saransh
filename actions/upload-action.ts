// "use server";

// import { fetchAndExtractPdfText } from "@/lib/langchain";

// export async function generatePdfSummry(
//   uploadResopnse: [
//     {
//       serverData: {
//         userId: string;
//         file: {
//           ufsurl: string;
//           name: string;
//         };
//       };
//     }
//   ]
// ) {
//   if (!uploadResopnse) {
//     return {
//       success: false,
//       message: "File Upload Fail",
//       data: null,
//     };
//   }
//   const {
//     serverData: {
//       userId,
//       file: { ufsurl: pdfUrl, name: fileName },
//     },
//   } = uploadResopnse[0];

//   if (!pdfUrl) {
//     return {
//       success: false,
//       message: "File Upload failedgit ",
//       data: null,
//     };
//   }

//   try {
//     const pdfText = await fetchAndExtractPdfText(pdfUrl);
//   } catch (err) {
//     return {
//       success: false,
//       message: "File Upload Fail",
//       data: null,
//     };
//   }
// }s

"use server";

import { fetchAndExtractPdfText } from "@/lib/langchain";
import type { ClientUploadedFileData } from "uploadthing/types";

export async function generatePdfSummry(
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
  const {
    serverData: {
      userId,
      file: { ufsUrl: pdfUrl, name: fileName },
    },
  } = uploadResponse[0];

  if (!pdfUrl) {
    return {
      success: false,
      message: "File URL missing",
      data: null,
    };
  }

  try {
    const pdfText = await fetchAndExtractPdfText(pdfUrl); // <-- your logic here
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
