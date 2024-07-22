'use client'

import PersonalInfoForm from '@/components/form/PersonalInfoForm'
import WorkoutGoalForm from '@/components/form/WorkoutGoalForm'
import WorkoutPlanForm from '@/components/form/WorkoutPlanForm'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { PersonalInfoData } from '@/components/form'
import { useCreatePlan } from '@/data/plan.query'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import * as z from 'zod'

export const createPlanFormSchema = z.object({
  personalInfo: z.object({
    planName: z.string().min(1, 'Plan name is required'),
    birthdate: z.string().min(1, 'Date of birth is required'),
    height: z.number().min(1, 'Height is required'),
    weight: z.number().min(1, 'Weight is required'),
    weeklyActivities: z.array(z.string()),
  }),
  weeklyActivities: z.array(z.string()),
  workoutGoal: z.string().min(1, 'Workout goal is required'),
  workoutPlan: z.string(),
})

export type CreatePlanFormData = z.infer<typeof createPlanFormSchema>

export default function CreatePlanPage() {
  const router = useRouter()
  const { mutateAsync: createPlan, isPending } = useCreatePlan()

  const [step, setStep] = useState(1)
  const [personalInfo, setPersonalInfo] = useState<PersonalInfoData | null>(null)
  const [workoutGoal, setworkoutGoal] = useState<string>('')

  const methods = useForm<CreatePlanFormData>({
    resolver: zodResolver(createPlanFormSchema),
    mode: 'all',
    defaultValues: {
      personalInfo: {
        planName: '',
        birthdate: '',
        height: 0,
        weight: 0,
      },
      weeklyActivities: [],
      workoutGoal: '',
      workoutPlan: '',
    },
  })

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

  const onSubmit = (data: CreatePlanFormData) => {
    console.log(data)
  }

  return (
    <FormProvider {...methods}>
      <div className="container relative mx-auto">
        <form onSubmit={methods.handleSubmit(onSubmit)} className="mx-4 my-12 mt-8 rounded bg-white px-4 py-8">
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
        </form>
      </div>
    </FormProvider>
  )
}
