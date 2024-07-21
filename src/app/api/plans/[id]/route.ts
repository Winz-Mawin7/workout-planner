import { dbConnect } from '@/lib/mongodb'
import { getCurrentUser } from '@/lib/session'
import { IWorkoutPlanDocument, WorkoutPlans } from '@/models/workoutPlans.model'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const session = await getCurrentUser()
  if (!session) return Response.json({ message: 'Unauthorized' }, { status: 401 })

  await dbConnect()

  let workoutPlans: IWorkoutPlanDocument | null
  workoutPlans = await WorkoutPlans.findOne({ userId: session.id, _id: params.id })

  return Response.json(workoutPlans)
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const session = await getCurrentUser()
  if (!session) return Response.json({ message: 'Unauthorized' }, { status: 401 })

  await dbConnect()

  const res = await WorkoutPlans.deleteOne({ _id: params.id })
  return Response.json(res)
}
