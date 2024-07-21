// app/api/register/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { hash } from 'bcryptjs'
import { dbConnect } from '@/lib/mongodb'
import { Users } from '@/models/users.model'

export async function POST(req: NextRequest) {
  const { email, password } = await req.json()

  if (!email || !password) {
    return NextResponse.json({ message: 'Email and password are required' }, { status: 400 })
  }

  try {
    await dbConnect()

    const existingUser = await Users.findOne({ email })
    if (existingUser) return NextResponse.json({ message: 'User already exists' }, { status: 400 })

    const hashedPassword = await hash(password, 12)
    const result = await Users.create({ email, password: hashedPassword })

    return NextResponse.json({ message: 'User created', userId: result._id }, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: 'Error creating user' }, { status: 500 })
  }
}
