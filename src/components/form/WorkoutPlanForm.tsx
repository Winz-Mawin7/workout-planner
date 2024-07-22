'use client'

import { ArrowPathIcon } from '@heroicons/react/20/solid'
import { PersonalInfoData } from './PersonalInfoForm'
import React, { useCallback, useEffect } from 'react'
import { Markdown } from '@/components/common'
import { useCompletion } from 'ai/react'

interface WorkoutPlanFormProps {
  personalInfo: PersonalInfoData
  workoutGoal: string
  onSubmit: (plan: string) => void
}

const WorkoutPlanForm: React.FC<WorkoutPlanFormProps> = ({ personalInfo, workoutGoal, onSubmit }) => {
  const { complete, completion, isLoading } = useCompletion({
    api: '/api/generate-plan',
  })

  const generatePlan = useCallback(async () => {
    await complete(JSON.stringify({ personalInfo, workoutGoal }))
  }, [personalInfo, workoutGoal])

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
    <form onSubmit={submit} className="space-y-4">
      <div>
        <div className="flex flex-row justify-between">
          <h3 className="text-xl font-semibold mb-2">Generated Plan</h3>
          <button
            className="btn btn-link btn-xs text-gray-500"
            disabled={isLoading || !completion}
            onClick={generatePlan}
          >
            Regenerate <ArrowPathIcon className="h-4 w-4" />
          </button>
        </div>
        <Markdown content={completion} />
      </div>

      <button type="submit" disabled={isLoading || !completion} className="w-full btn">
        Save Plan
      </button>
    </form>
  )
}

export default WorkoutPlanForm
