// import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";




export async function  fetchAndExtractPdfText(pdfUrl:String){
    const response = await fetch(pdfUrl)

const blob= await response.blob();
const arrayBuffer = await blob.arrayBuffer();
const loader = new PDFLoader(new Blob([arrayBuffer]));
const docs = await loader.load();

return docs.map((doc)=>doc.pageContent).join('\n')



}