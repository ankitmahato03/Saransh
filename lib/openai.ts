import OpenAI from "openai";
const client = new OpenAI();

export  async function generateSummryFromOpenAi(pdfText:string){

const response = await client.responses.create({
    model: "gpt-4",
    input: pdfText,
    temperature: 0.7,
    max_output_tokens:1500,
});

console.log(response.output_text);
return response;
}

//3:28.25 video timestamp