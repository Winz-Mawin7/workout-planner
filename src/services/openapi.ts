import OpenAI from 'openai'
import { createOpenAI, openai } from '@ai-sdk/openai'

const openaiService = createOpenAI({
  // custom settings, e.g.
  compatibility: 'strict', // strict mode, enable when using the OpenAI API
  apiKey: process.env.OPENAI_API_KEY,
})

const model = openai('GPT-4o-mini')

module.exports = {
  openaiService,
  model,
}
