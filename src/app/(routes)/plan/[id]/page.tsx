'use client'

import { IdentificationIcon, CakeIcon, CircleStackIcon } from '@heroicons/react/20/solid'
import { Loading, Markdown } from '@/components/common'
import { usePlanQuery } from '@/data/plan.query'

export default function PlanDetailPage({ params }: { params: { id: string } }) {
  const { data: plan, isLoading, isError, error } = usePlanQuery(params.id)

  if (isLoading) return <Loading />
  if (isError) return <div>{error.message}</div>
  if (!plan) return <div>Plan not found</div>

  return (
    <div className="container mx-auto flex flex-col gap-4 p-4">
      <div className="flex flex-col gap-4 rounded-xl bg-white p-4">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            {plan.planName}
          </h2>
          <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <IdentificationIcon aria-hidden="true" className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" />
              {plan.height}cm
            </div>
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <CircleStackIcon aria-hidden="true" className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" />
              {plan.weight}kg
            </div>
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <CakeIcon aria-hidden="true" className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" />
              {new Date(plan.birthdate).toLocaleDateString()}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {!!plan.weeklyActivities.length && (
            <ul>
              <strong>Weekly Activities:</strong>
              {plan.weeklyActivities.map((activity) => (
                <li key={activity}>{activity}</li>
              ))}
            </ul>
          )}
          {!!plan.weeklyActivities.length && (
            <ul>
              <strong>Workout Goals:</strong>
              {plan.workoutGoal}
            </ul>
          )}
        </div>
      </div>
      <Markdown content={plan.weeklyPlan} />
    </div>
  )
}
