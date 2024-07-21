import { LoginForm } from '@/components/form'
import { getCurrentUser } from '@/lib/session'
import { useSession } from 'next-auth/react'

export default async function DashboardPage() {
  const session = await getCurrentUser()
  console.log('🚀 ~ DashboardPage ~ session:', session)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Dashboard</h1>
      <p>Welcome, {session?.email}</p>
      {/* Add your dashboard content here */}
    </div>
  )
}
