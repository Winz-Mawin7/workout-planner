// app/api/generate-goals/route.ts
import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { OpenAIStream, StreamingTextResponse, streamText } from 'ai'
// import { openai } from '@ai-sdk/openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: NextRequest) {
  const personalInfo = await req.json()
  console.log('🚀 ~ POST ~ personalInfo:', personalInfo)

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      temperature: 0.6,
      max_tokens: 100,
      messages: [
        { role: 'system', content: 'You are a professional fitness trainer.' },
        {
          role: 'user',
          content: `Based on the following personal information, suggest three short workout goals:
            Date of Birth: ${personalInfo.birthdate}
            Height: ${personalInfo.height} cm
            Weight: ${personalInfo.weight} kg
            Weekly Activities: ${personalInfo.weeklyActivities.join(', ')}

            Respond with three short phrases without numbered or bullet points, delimited by newlines, that are specific, achievable workout goals.`,
        },
      ],
    })

    console.log('🚀 ~ POST ~ stream:', JSON.stringify(response, null, 4))
    const workoutGoals = response.choices[0].message.content?.split('\n').map((goal) => goal.trim())

    return Response.json(workoutGoals)

    // const result = await streamText({
    //   model: openai('gpt-3.5-turbo-0125'),
    //   messages: [
    //     { role: 'system', content: 'You are a professional fitness trainer.' },
    //     {
    //       role: 'user',
    //       content: `Given the following information about a person, suggest 3 appropriate workout goals:
    //       Date of Birth: ${personalInfo.birthdate}
    //       Height: ${personalInfo.height} cm
    //       Weight: ${personalInfo.weight} kg
    //       Weekly Activities: ${personalInfo.weeklyActivities.join(', ')}

    //       Provide 3 specific, achievable workout goals:`,
    //     },
    //   ],
    // })
    // return new StreamingTextResponse(result.toAIStream())
  } catch (error) {
    console.error('Error generating workout goals:', error)
    return NextResponse.json({ error: 'Failed to generate workout goals' }, { status: 500 })
  }
}
