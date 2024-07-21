import { dbConnect } from '@/lib/mongodb'
import { Users } from '@/models/users.model'

export async function GET(request: Request) {
  await dbConnect()
  const users = await Users.find()

  console.log('🚀 ~ GET ~ docs:', users)

  return Response.json({ users })
}

export async function POST(request: Request) {
  const res = await request.json()
  return Response.json({ res })
}
