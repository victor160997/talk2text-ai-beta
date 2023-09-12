import { OpenAI } from "langchain/llms/openai";

export const POST = async (request) => {
  try {
    const { text } = await request.json();
    const llm = new OpenAI({
      openAIApiKey: "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",
      temperature: 1,
      modelName: "gpt-3.5-turbo-16k"
    });
    const result = await llm.predict(`Transforme essa transcrição de audio em um texto deixando o mais fiel possível ao audio: ${text}`);

    return new Response(JSON.stringify(result), { status: 200 })
  } catch (error) {
      return new Response(error, { status: 500 })
  }
} 