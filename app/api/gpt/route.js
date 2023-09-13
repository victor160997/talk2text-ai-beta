import { OpenAI } from "langchain/llms/openai";

export const POST = async (request) => {
  try {
    const { text } = await request.json();
    const llm = new OpenAI({
      openAIApiKey: process.env.ZAPIER_NLA_API_KEY,
      temperature: 1,
      modelName: "gpt-3.5-turbo-16k"
    });
    const result = await llm.predict(`Essa é uma transcrição de audio, formate para um texto mais compreensível tirando partes desnecessárias: ${text}`);

    return new Response(JSON.stringify(result), { status: 200 })
  } catch (error) {
      return new Response(error, { status: 500 })
  }
} 