import { IWorkoutPlanDocument, WorkoutPlans } from '@/models/workoutPlans.model'
import { getCurrentUser } from '@/lib/session'
import { dbConnect } from '@/lib/mongodb'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const session = await getCurrentUser()
  if (!session) return Response.json({ message: 'Unauthorized' }, { status: 401 })

  await dbConnect()

  let workoutPlans: IWorkoutPlanDocument[] = []
  workoutPlans = await WorkoutPlans.find({ userId: session.id })

  return Response.json(workoutPlans)
}

export async function POST(req: NextRequest) {
  const session = await getCurrentUser()
  if (!session) return Response.json({ message: 'Unauthorized' }, { status: 401 })

  const planData = await req.json()
  console.log('🚀 ~ POST ~ planData:', planData)

  try {
    await dbConnect()

    const plan = new WorkoutPlans({
      userId: session.id,
      planName: planData.planName,
      birthdate: planData.birthdate,
      height: planData.height,
      weight: planData.weight,
      weeklyActivities: planData.weeklyActivities,
      workoutGoal: planData.workoutGoal,
      weeklyPlan: planData.weeklyPlan,
    })

    await plan.save()

    return Response.json({ message: 'Workout plan saved successfully', plan })
  } catch (error) {
    console.error('Error saving workout plan:', error)
    return Response.json({ error: 'Failed to save workout plan' }, { status: 500 })
  }
}
