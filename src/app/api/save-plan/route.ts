// app/api/save-plan/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { dbConnect } from '@/lib/mongodb'
import { WorkoutPlans } from '@/models/workoutPlans.model'

export async function POST(req: NextRequest) {
  const planData = await req.json()
  console.log('🚀 ~ POST ~ planData:', planData)

  try {
    await dbConnect()

    const workoutPlan = new WorkoutPlans({
      userId: planData.userId,
      planName: planData.planName,
      birthdate: planData.birthdate,
      height: planData.height,
      weight: planData.weight,
      weeklyActivities: planData.weeklyActivities,
      workoutGoals: planData.workoutGoals,
      weeklyPlan: planData.weeklyPlan,
    })

    await workoutPlan.save()

    return NextResponse.json({ message: 'Workout plan saved successfully' })
  } catch (error) {
    console.error('Error saving workout plan:', error)
    return NextResponse.json({ error: 'Failed to save workout plan' }, { status: 500 })
  }
}
