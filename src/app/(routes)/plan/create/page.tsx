'use client'

import PersonalInfoForm from '@/components/form/PersonalInfoForm'
import WorkoutGoalForm from '@/components/form/WorkoutGoalForm'
import WorkoutPlanForm from '@/components/form/WorkoutPlanForm'
import { PersonalInfoData } from '@/components/form'
import { useCreatePlan } from '@/data/plan.query'
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

  const goBack = () => setStep((prev) => prev - 1)

  const handleWorkoutPlanSubmit = async (plan: string) => {
    if (!personalInfo) return
    if (isPending) return

    try {
      await createPlan({ ...personalInfo, birthdate: new Date(personalInfo.birthdate), workoutGoal, weeklyPlan: plan })
      router.push('/dashboard')

      // Reset form and show success message
      // setStep(1)
      // setPersonalInfo(null)
      // setworkoutGoal('')
    } catch (error) {
      console.error('Error saving workout plan:', error)
      alert('Failed to save workout plan. Please try again.')
    }
  }

  return (
    <div className="container relative mx-auto">
      <div className="mx-4 my-12 mt-8 rounded bg-white px-4 py-8">
        {step === 1 && <PersonalInfoForm onSubmit={handlePersonalInfoSubmit} />}
        {step === 2 && personalInfo && (
          <WorkoutGoalForm personalInfo={personalInfo} onSubmit={handleworkoutGoalSubmit} goBack={goBack} />
        )}
        {step === 3 && personalInfo && (
          <WorkoutPlanForm
            personalInfo={personalInfo}
            workoutGoal={workoutGoal}
            onSubmit={handleWorkoutPlanSubmit}
            goBack={goBack}
          />
        )}
      </div>
    </div>
  )
}
