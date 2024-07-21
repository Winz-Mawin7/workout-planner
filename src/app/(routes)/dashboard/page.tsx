// app/dashboard/page.tsx
'use client'

import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { PersonalInfoData } from '@/components/form'
import PersonalInfoForm from '@/components/form/PersonalInfoForm'
import WorkoutGoalForm from '@/components/form/WorkoutGoalForm'
import WorkoutPlanForm from '@/components/form/WorkoutPlanForm'
import axios from 'axios'
import { IWorkoutPlanDocument } from '@/models/workoutPlans.model'

export default function DashboardPage() {
  const [workoutPlans, setWorkoutPlans] = useState<IWorkoutPlanDocument[]>([])
  const { data: session } = useSession()
  const router = useRouter()

  const [step, setStep] = useState(1)
  const [personalInfo, setPersonalInfo] = useState<PersonalInfoData | null>(null)
  const [workoutGoals, setWorkoutGoals] = useState<string[]>([])

  useEffect(() => {
    ;(async () => {
      axios.get('/api/workout-plan').then((res) => setWorkoutPlans(res.data))
    })()

    return () => {
      setWorkoutPlans([])
    }
  }, [])

  const handlePersonalInfoSubmit = (data: PersonalInfoData) => {
    setPersonalInfo(data)
    setStep(2)
  }

  const handleWorkoutGoalsSubmit = (goals: string[]) => {
    setWorkoutGoals(goals)
    setStep(3)
  }

  const handleWorkoutPlanSubmit = async (plan: string) => {
    try {
      const response = await axios.post('/api/save-plan', {
        userId: session?.user.id,
        ...personalInfo,
        workoutGoals,
        weeklyPlan: plan,
      })
      console.log('🚀 ~ handleWorkoutPlanSubmit ~ response:', response)

      // Reset form and show success message
      setStep(1)
      setPersonalInfo(null)
      setWorkoutGoals([])
      alert('Workout plan saved successfully!')
    } catch (error) {
      console.error('Error saving workout plan:', error)
      alert('Failed to save workout plan. Please try again.')
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Dashboard</h1>
      <p className="mb-4">Welcome, {session?.user.email}</p>
      <div className="mt-8">
        {step === 1 && <PersonalInfoForm onSubmit={handlePersonalInfoSubmit} />}
        {step === 2 && personalInfo && (
          <WorkoutGoalForm personalInfo={personalInfo} onSubmit={handleWorkoutGoalsSubmit} />
        )}
        {step === 3 && personalInfo && (
          <WorkoutPlanForm personalInfo={personalInfo} workoutGoals={workoutGoals} onSubmit={handleWorkoutPlanSubmit} />
        )}
      </div>
    </div>
  )
}
