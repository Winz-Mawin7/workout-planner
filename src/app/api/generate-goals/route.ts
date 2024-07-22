import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: NextRequest) {
  const personalInfo = await req.json()

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
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

            Respond with three short phrases without numbered or bullet points, delimited by //, that are specific, achievable workout goals.`,
        },
      ],
    })
    console.log('🚀 ~ POST ~ response:', JSON.stringify(response, null, 4))

    const goalsSuggest = response.choices[0].message.content?.split('//').map((v) => v.trim()) || []
    console.log('🚀 ~ POST ~ goalsSuggest:', goalsSuggest)

    return Response.json(goalsSuggest)
  } catch (error) {
    console.error('Error generating workout goals:', error)
    return NextResponse.json({ error: 'Failed to generate workout goals' }, { status: 500 })
  }
}
