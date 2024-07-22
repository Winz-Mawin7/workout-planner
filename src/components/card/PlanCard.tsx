'use client'

import { PlanResponse, useDeletePlan } from '@/data/plan/plan.query'
import ConfirmDialog from '../common/ConfirmDialog'
import { useState } from 'react'
import Link from 'next/link'

export const PlanCard = (props: PlanResponse) => {
  const [showDialog, setShowDialog] = useState(false)
  const { _id, planName, workoutGoal } = props
  const { mutate: deletePlan } = useDeletePlan()

  const handleDelete = async () => {
    deletePlan(_id)
  }

  return (
    <div className="relative rounded-lg border bg-white p-4 shadow-sm hover:bg-slate-50">
      <Link key={_id} href={`/plan/${_id}`}>
        <h2 className="text-xl font-semibold text-blue-600">{planName}</h2>
        <p>Goal: {workoutGoal}</p>
      </Link>
      <button
        onClick={() => setShowDialog(true)}
        className="btn btn-square btn-outline btn-xs absolute right-4 top-4 z-10"
      >
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
      <ConfirmDialog onClose={() => setShowDialog(false)} open={showDialog} onConfirm={handleDelete} />
    </div>
  )
}

export const PlanCardLoading = () => {
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="skeleton h-8 w-full"></div>
      <div className="skeleton h-8 w-full"></div>
      <div className="skeleton h-8 w-full"></div>
    </div>
  )
}
