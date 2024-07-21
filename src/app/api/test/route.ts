import clientPromise from '@/lib/mongodb'

export async function GET(request: Request) {
  const client = await clientPromise
  const usersCollection = client.db().collection('users')

  const docs = await usersCollection.find({}).toArray()
  console.log('🚀 ~ GET ~ docs:', docs)

  return new Response('Hello, Next.js!')
}
