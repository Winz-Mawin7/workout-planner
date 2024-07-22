import { OpenAIStream, StreamingTextResponse } from 'ai'
import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
// import { openai } from '@ai-sdk/openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { personalInfo, workoutGoal } = JSON.parse(body.prompt)

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      temperature: 0.6,
      // max_tokens: 1500,
      messages: [
        { role: 'system', content: 'You are a professional fitness trainer.' },
        {
          role: 'user',
          content: `Create a weekly workout plan based on the following information:
          Personal Info:
          Date of Birth: ${personalInfo.birthdate}
          Height: ${personalInfo.height} cm
          Weight: ${personalInfo.weight} kg
          Weekly Activities: ${personalInfo.weeklyActivities.join(', ')}

          Workout Goals: ${workoutGoal}
          Provide a detailed day-by-day plan for one week, including exercises, sets, reps, and rest periods:`,
        },
      ],
      stream: true,
    })

    const stream = OpenAIStream(response)
    return new StreamingTextResponse(stream)
  } catch (error) {
    console.error('Error generating workout plan:', error)
    return NextResponse.json({ error: 'Failed to generate workout plan' }, { status: 500 })
  }
}
