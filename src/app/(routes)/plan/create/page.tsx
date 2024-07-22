'use client'

import PersonalInfoForm from '@/components/form/PersonalInfoForm'
import WorkoutGoalForm from '@/components/form/WorkoutGoalForm'
import WorkoutPlanForm from '@/components/form/WorkoutPlanForm'
import { useCreatePlan } from '@/data/plan/plan.query'
import { PersonalInfoData } from '@/components/form'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function CreatePlanPage() {
  const router = useRouter()
  const { mutateAsync: createPlan, isPending } = useCreatePlan()

  const [step, setStep] = useState(1)
  const [personalInfo, setPersonalInfo] = useState<PersonalInfoData | null>(null)
  const [workoutGoal, setworkoutGoal] = useState<string>('')

  const handlePersonalInfoSubmit = (data: PersonalInfoData) => {
    setPersonalInfo(data)
    setStep(2)
  }

  const handleworkoutGoalSubmit = (goals: string) => {
    setworkoutGoal(goals)
    setStep(3)
  }

  const handleWorkoutPlanSubmit = async (plan: string) => {
    if (!personalInfo) return
    if (isPending) return

    try {
      await createPlan({ ...personalInfo, birthdate: new Date(personalInfo.birthdate), workoutGoal, weeklyPlan: plan })

      // Reset form and show success message
      setStep(1)
      setPersonalInfo(null)
      setworkoutGoal('')

      router.push('/dashboard')
    } catch (error) {
      console.error('Error saving workout plan:', error)
      alert('Failed to save workout plan. Please try again.')
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 relative">
      <div className="mt-8">
        {step === 1 && <PersonalInfoForm onSubmit={handlePersonalInfoSubmit} />}
        {step === 2 && personalInfo && (
          <WorkoutGoalForm personalInfo={personalInfo} onSubmit={handleworkoutGoalSubmit} />
        )}
        {step === 3 && personalInfo && (
          <WorkoutPlanForm personalInfo={personalInfo} workoutGoal={workoutGoal} onSubmit={handleWorkoutPlanSubmit} />
        )}
      </div>
    </div>
  )
}
