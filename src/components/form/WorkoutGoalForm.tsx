'use client'

import { useGenerateGoalsQuery } from '@/data/generate.query'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { ArrowPathIcon } from '@heroicons/react/20/solid'
import { PersonalInfoData } from './PersonalInfoForm'
import { PlanCardLoading } from '../card'
import React, { useState } from 'react'
import clsx from 'clsx'

interface WorkoutGoalFormProps {
  personalInfo: PersonalInfoData
  onSubmit: (goals: string) => void
  goBack: () => void
}

const WorkoutGoalForm: React.FC<WorkoutGoalFormProps> = ({ personalInfo, onSubmit, goBack }) => {
  const [goalSelected, setGoalSelected] = useState('')

  const { data: goalsSuggest, isFetching, refetch } = useGenerateGoalsQuery(personalInfo)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(goalSelected)
  }

  const handleRefresh = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    refetch()
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="btn btn-sm self-start" onClick={goBack}>
        <ArrowLeftIcon className="h-4 w-4" />
        Back
      </div>
      <h2 className="text-lg font-bold">Work out Goal </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-row items-center justify-between">
          <p className="text-sm font-semibold">Choose one goal</p>
          <button className="btn btn-link btn-xs text-gray-500" disabled={isFetching} onClick={handleRefresh}>
            regenerate <ArrowPathIcon className="h-4 w-4" />
          </button>
        </div>

        {isFetching ? (
          <PlanCardLoading />
        ) : (
          goalsSuggest?.map((goal) => (
            <div
              key={goal}
              className={clsx('btn btn-block', { 'border-slate-800': goalSelected === goal })}
              onClick={() => setGoalSelected(goal)}
            >
              {goal}
            </div>
          ))
        )}
        <button type="submit" disabled={!goalSelected} className="btn btn-neutral mt-4 w-full">
          Next
        </button>
      </form>
    </div>
  )
}

export default WorkoutGoalForm
