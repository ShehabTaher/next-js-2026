import { streamObject } from 'ai'
import { openai } from '@ai-sdk/openai'
import { recipeSchema } from './schema'

export async function POST(req: Request) {
  try {
    const { dish } = await req.json()
    const result = streamObject({
      model: openai('gpt-4.1-nano'),
      prompt: `Generate a recipe for ${dish}`,
      schema: recipeSchema,
    })
    return result.toTextStreamResponse()
  } catch (error) {
    console.error('Error in structured data API', error)
    return Response.json({ error: 'Failed to stream object' }, { status: 500 })
  }
}
