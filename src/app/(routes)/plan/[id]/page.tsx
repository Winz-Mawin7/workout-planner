'use client'

import { usePlanQuery } from '@/data/plan/plan.query'

export default function PlanDetailPage({ params }: { params: { id: string } }) {
  const { data: plan, isLoading, isError, error } = usePlanQuery(params.id)

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>{error.message}</div>
  if (!plan) return <div>Plan not found</div>

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{plan.planName}</h1>
      <div className="space-y-4">
        <p>
          <strong>Date of Birth:</strong> {new Date(plan.birthdate).toLocaleDateString()}
        </p>
        <p>
          <strong>Height:</strong> {plan.height} cm
        </p>
        <p>
          <strong>Weight:</strong> {plan.weight} kg
        </p>
        <p>
          <strong>Weekly Activities:</strong> {plan.weeklyActivities.join(', ')}
        </p>
        <p>
          <strong>Workout Goal:</strong> {plan.workoutGoals}
        </p>
        <div>
          <h2 className="text-xl font-semibold mb-2">Weekly Plan:</h2>
          <pre className="whitespace-pre-wrap bg-gray-100 p-4 rounded">{plan.weeklyPlan}</pre>
        </div>
      </div>
    </div>
  )
}
