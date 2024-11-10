import * as dotenv from "dotenv"
import OpenAI from "openai"
dotenv.config()

const openai = new OpenAI({
  apiKey: process.env["OPENAI_API_KEY"],
})

export const runtime = "edge"

export async function POST(req: Request): Promise<Response> {
  try {
    const forwardedProps = await req.json()

    const stream = openai.beta.chat.completions
      .stream({
        model: "gpt-4-1106-preview",
        ...forwardedProps,
        stream: true,
      })
      .toReadableStream()

    return new Response(stream)
  } catch (error: any) {
    return new Response("", { status: 500, statusText: error.error.message })
  }
}
