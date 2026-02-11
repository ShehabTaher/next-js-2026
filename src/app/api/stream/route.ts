import { streamText } from 'ai'
import { openai } from '@ai-sdk/openai'

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json()
    const result = streamText({
      model: openai('gpt-4.1-mini'),
      prompt,
    })

    return result.toUIMessageStreamResponse()
  } catch (error) {
    console.error('Error in stream API', error)
    return Response.json({ error: 'Failed to stream text' }, { status: 500 })
  }
}
