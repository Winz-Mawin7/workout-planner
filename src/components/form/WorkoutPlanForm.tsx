'use client'

import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { ArrowPathIcon } from '@heroicons/react/20/solid'
import { PersonalInfoData } from './PersonalInfoForm'
import React, { useCallback, useEffect } from 'react'
import { Markdown } from '@/components/common'
import { useCompletion } from 'ai/react'

interface WorkoutPlanFormProps {
  personalInfo: PersonalInfoData
  workoutGoal: string
  onSubmit: (plan: string) => void
  goBack: () => void
}

const WorkoutPlanForm: React.FC<WorkoutPlanFormProps> = ({ personalInfo, workoutGoal, onSubmit, goBack }) => {
  const { complete, completion, isLoading } = useCompletion({
    api: '/api/generate-plan',
  })

  const generatePlan = useCallback(async () => {
    await complete(JSON.stringify({ personalInfo, workoutGoal }))
  }, [])

  useEffect(() => {
    console.log('generate plan run')
    generatePlan()
  }, [])

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isLoading) return

    onSubmit(completion)
  }

  return (
    <div className="flex flex-col gap-4">
      <button className="btn btn-sm self-start" onClick={goBack}>
        <ArrowLeftIcon className="h-4 w-4" />
        Back
      </button>
      <div className="flex flex-row justify-between">
        <h2 className="text-lg font-bold">Generated Plan</h2>
        <button
          className="btn btn-link btn-xs text-gray-500"
          disabled={isLoading || !completion}
          onClick={generatePlan}
        >
          regenerate <ArrowPathIcon className="h-4 w-4" />
        </button>
      </div>
      <h3>Goal: {workoutGoal}</h3>

      <form onSubmit={submit} className="space-y-4">
        <div>
          <Markdown content={completion} />
        </div>

        <button type="submit" disabled={isLoading || !completion} className="btn btn-neutral w-full">
          Save Plan
        </button>
      </form>
    </div>
  )
}

export default WorkoutPlanForm
