import { PlanResponse, useDeletePlan } from '@/data/plan/plan.query'
import Link from 'next/link'

export const PlanCard = (props: PlanResponse) => {
  const { _id, planName, workoutGoals } = props
  const { mutate: deletePlan } = useDeletePlan()

  const handleDelete = async () => {
    deletePlan(_id)
  }

  return (
    <div className="border p-4 rounded-lg shadow-sm bg-white hover:bg-slate-50 relative">
      <Link key={_id} href={`/plan/${_id}`}>
        <h2 className="text-xl font-semibold text-blue-600">{planName}</h2>
        <p>Goal: {workoutGoals}</p>
      </Link>
      <button onClick={handleDelete} className="btn btn-xs btn-square btn-outline absolute top-4 right-4 z-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  )
}
