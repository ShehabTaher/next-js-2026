import { openai } from '@ai-sdk/openai'
import { generateText } from 'ai'

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json()
    const { text } = await generateText({
      model: openai('gpt-4o-mini'),
      prompt,
    })

    return Response.json({ text })
  } catch (error) {
    console.error('Error in completion API', error)
    return Response.json({ error: 'Failed to complete' }, { status: 500 })
  }
}
