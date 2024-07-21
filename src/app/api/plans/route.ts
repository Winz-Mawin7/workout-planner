import { dbConnect } from '@/lib/mongodb'
import { getCurrentUser } from '@/lib/session'
import { IWorkoutPlanDocument, WorkoutPlans } from '@/models/workoutPlans.model'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const session = await getCurrentUser()
  if (!session) return Response.json({ message: 'Unauthorized' }, { status: 401 })

  await dbConnect()

  let workoutPlans: IWorkoutPlanDocument[] = []
  workoutPlans = await WorkoutPlans.find({ userId: session.id })

  return Response.json(workoutPlans)
}
