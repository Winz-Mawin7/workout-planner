// components/WorkoutGoalForm.tsx
'use client'

import React, { useState } from 'react'
import { PersonalInfoData } from './PersonalInfoForm'
import { useCompletion } from 'ai/react'
import axios from 'axios'

interface WorkoutGoalFormProps {
  personalInfo: PersonalInfoData
  onSubmit: (goals: string[]) => void
}

const WorkoutGoalForm: React.FC<WorkoutGoalFormProps> = ({ personalInfo, onSubmit }) => {
  const [goalsSuggest, setGoalsSuggest] = useState<string[]>([])
  const [goalSelected, setGoalSelected] = useState('')

  // const { complete, completion, isLoading, } = useCompletion({
  //   api: '/api/generate-goals',

  // })

  const generateGoals = async () => {
    const result = await axios.post('/api/generate-goals', personalInfo)
    setGoalsSuggest(result.data)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(goalsSuggest)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <button
        type="button"
        onClick={generateGoals}
        // disabled={isLoading}
        className="w-full bg-blue-500 text-white py-2 rounded"
      >
        {/* {isLoading ? 'Generating...' : 'Generate Workout Goals'} */}
        {'Generate Workout Goals'}
      </button>
      {}

      {goalsSuggest.map((goal) => (
        <button key={goal} className="btn btn-block" onClick={() => setGoalSelected(goal)}>
          {goal}
        </button>
      ))}
      {/* {completion && (
        <div>
          <h3 className="text-xl font-semibold mb-2">Generated Goals:</h3>
          <pre className="whitespace-pre-wrap bg-gray-100 p-4 rounded">{completion}</pre>
        </div>
      )} */}
      <button type="submit" disabled={!goalSelected} className="w-full bg-green-500 text-white py-2 rounded">
        Next
      </button>
    </form>
  )
}

export default WorkoutGoalForm
