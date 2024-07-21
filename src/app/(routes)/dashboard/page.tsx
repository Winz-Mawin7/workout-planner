'use client'

import { useCreatePlan, usePlansQuery } from '@/data/plan/plan.query'
import PersonalInfoForm from '@/components/form/PersonalInfoForm'
import WorkoutGoalForm from '@/components/form/WorkoutGoalForm'
import WorkoutPlanForm from '@/components/form/WorkoutPlanForm'
import { PersonalInfoData } from '@/components/form'
import { PlanCard } from '@/components/card'
import { useSession } from 'next-auth/react'
import React, { useState } from 'react'

export default function DashboardPage() {
  const { data: session } = useSession()
  const { data: plans } = usePlansQuery()
  const { mutateAsync: createPlan, isPending } = useCreatePlan()

  const [step, setStep] = useState(1)
  const [personalInfo, setPersonalInfo] = useState<PersonalInfoData | null>(null)
  const [workoutGoals, setWorkoutGoals] = useState<string[]>([])

  const handlePersonalInfoSubmit = (data: PersonalInfoData) => {
    setPersonalInfo(data)
    setStep(2)
  }

  const handleWorkoutGoalsSubmit = (goals: string[]) => {
    setWorkoutGoals(goals)
    setStep(3)
  }

  const handleWorkoutPlanSubmit = async (plan: string) => {
    if (!personalInfo) return

    try {
      await createPlan({ ...personalInfo, birthdate: new Date(personalInfo.birthdate), workoutGoals, weeklyPlan: plan })

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
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Your Workout Plans</h1>
        <div className="space-y-4 gap-4">{plans?.map((plan) => <PlanCard key={plan._id} {...plan} />)}</div>
      </div>

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
