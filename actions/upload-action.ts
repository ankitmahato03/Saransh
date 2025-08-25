"use server";

import { getData } from "@/lib/db";
import { fetchAndExtractPdfText } from "@/lib/langchain";
import { auth } from "@clerk/nextjs/server";
import type { ClientUploadedFileData } from "uploadthing/types";

interface pdfSavedSummeryinterface {
userId?:string;fileName:string;Summry:string;title:string;ufsUrl:string
}

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

 async function savePDFSummry({userId,fileName,Summry,title,ufsUrl}:pdfSavedSummeryinterface) {
  try {
    const sql= await getData();
    await sql`INSERT INTO pdf_summaries (
      user_id,
      original_file_url,
      summary_text,
      status,
      title,
      file_name
    ) VALUES (
      ${ufsUrl},
      ${userId},
      ${title},
      ${Summry},
      ${fileName},

    )`;

  } catch (error) {
    console.error("Error saving the summery ",error)
  }
  
}


export async function storePdfSummry({fileName,Summry,title,ufsUrl}:pdfSavedSummeryinterface) {

  let savedSummry:any;
  try {
    const {userId} = await auth();
    if(!userId){
      return{
        success:false,
        message:"user not found"
      }
    }
    savedSummry = await savePDFSummry({
      userId,fileName,Summry,title,ufsUrl
    });

    if (!savedSummry) {
      return {
        success:false,
        message:"Failed to save summery"
      }
      
    }

      return {
        success:true,
        message:"hoola youer pdf is to save summery"
      }
    
  } catch (error) {
    return {
      success:false,
      message:error instanceof Error ? error.message:"error While saving the PDF Summry"
    }
  }
}