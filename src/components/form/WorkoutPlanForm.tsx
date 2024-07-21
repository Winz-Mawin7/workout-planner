// components/WorkoutPlanForm.tsx
'use client'

import React, { useState } from 'react'
import { PersonalInfoData } from './PersonalInfoForm'
import { useCompletion } from 'ai/react'

interface WorkoutPlanFormProps {
  personalInfo: PersonalInfoData
  workoutGoals: string[]
  onSubmit: (plan: string) => void
}

const WorkoutPlanForm: React.FC<WorkoutPlanFormProps> = ({ personalInfo, workoutGoals, onSubmit }) => {
  const { complete, completion, isLoading } = useCompletion({
    api: '/api/generate-plan',
  })

  const generatePlan = async () => {
    await complete(JSON.stringify({ personalInfo, workoutGoals }))
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (completion) {
      onSubmit(completion)
    }
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <button
        type="button"
        onClick={generatePlan}
        disabled={isLoading}
        className="w-full bg-blue-500 text-white py-2 rounded"
      >
        {isLoading ? 'Generating...' : 'Generate Workout Plan'}
      </button>
      {completion && (
        <div>
          <h3 className="text-xl font-semibold mb-2">Generated Plan:</h3>
          <pre className="whitespace-pre-wrap bg-gray-100 p-4 rounded">{completion}</pre>
        </div>
      )}
      <button type="submit" disabled={!completion} className="w-full bg-green-500 text-white py-2 rounded">
        Save Plan
      </button>
    </form>
  )
}

export default WorkoutPlanForm
