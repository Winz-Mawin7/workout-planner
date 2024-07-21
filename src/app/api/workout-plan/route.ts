import { dbConnect } from '@/lib/mongodb'
import { getCurrentUser } from '@/lib/session'
import { WorkoutPlans } from '@/models/workoutPlans.model'

export async function GET() {
  const session = await getCurrentUser()
  console.log('🚀 ~ GET ~ session:', session)

  if (!session) return Response.json({ message: 'Unauthorized' }, { status: 401 })

  await dbConnect()
  const workoutPlans = await WorkoutPlans.find({ userId: session.id })

  return Response.json({ workoutPlans })
}
