// components/PersonalInfoForm.tsx
'use client'

import { CreatePlanFormData } from '@/app/(routes)/plan/create/page'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { PlusCircleIcon } from '@heroicons/react/24/outline'
import React, { useEffect, useState } from 'react'

export interface PersonalInfoData {
  planName: string
  birthdate: string
  height: number
  weight: number
  weeklyActivities: string[]
}

type PersonalInfoFormProps = {
  onNext: () => void
}

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({ onNext }: PersonalInfoFormProps) => {
  const [isPersonalInfoValid, setIsPersonalInfoValid] = useState(false)
  const {
    register,
    formState: { errors, isValid },
    watch,
    trigger,
    control,
  } = useFormContext<CreatePlanFormData>()
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'personalInfo.weeklyActivities',
  })

  const personalInfo = watch('personalInfo')
  console.log('🚀 ~ personalInfo:', personalInfo)

  useEffect(() => {
    const validatePersonalInfo = async () => {
      const result = await trigger('personalInfo', { shouldFocus: true })
      console.log('🚀 ~ validatePersonalInfo ~ result:', result)
      setIsPersonalInfoValid(result)
    }

    validatePersonalInfo()
  }, [trigger, personalInfo.planName])

  // const [formData, setFormData] = useState<PersonalInfoData>({
  //   planName: '',
  //   birthdate: '',
  //   height: 0,
  //   weight: 0,
  //   weeklyActivities: [''],
  // })

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value })
  // }

  // const handleActivityChange = (index: number, value: string) => {
  //   const newActivities = [...formData.weeklyActivities]
  //   newActivities[index] = value
  //   setFormData({ ...formData, weeklyActivities: newActivities })
  // }

  // const addActivity = () => {
  //   setFormData({ ...formData, weeklyActivities: [...formData.weeklyActivities, ''] })
  // }

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault()
  //   onSubmit(formData)
  // }

  const handleNext = async () => {
    onNext()
  }

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-bold">Personal Info</h2>
      <div>
        <label htmlFor="planName" className="label label-text">
          Plan Name
        </label>
        <input
          id="planName"
          type="text"
          className="input input-bordered w-full"
          {...register('personalInfo.planName')}
        />
        {errors.personalInfo?.planName && <p className="text-red-500">{errors.personalInfo.planName.message}</p>}
      </div>
      <div>
        <label htmlFor="birthdate" className="label label-text">
          Date of Birth
        </label>
        <input
          type="date"
          id="birthdate"
          // name="birthdate"
          // value={formData.birthdate}
          // onChange={handleChange}
          // required
          className="input input-bordered w-full"
          {...register('personalInfo.birthdate')}
        />
        {errors.personalInfo?.birthdate && <p className="text-red-500">{errors.personalInfo.birthdate.message}</p>}
      </div>
      <div>
        <label htmlFor="height" className="label label-text">
          Height (cm)
        </label>
        <input
          type="number"
          id="height"
          // name="height"
          // value={formData.height}
          // onChange={handleChange}
          // required
          className="input input-bordered w-full"
          {...register('personalInfo.height', { valueAsNumber: true })}
        />
        {errors.personalInfo?.height && <p className="text-red-500">{errors.personalInfo.height.message}</p>}
      </div>
      <div>
        <label htmlFor="weight" className="label label-text">
          Weight (kg)
        </label>
        <input
          type="number"
          id="weight"
          // name="weight"
          // value={formData.weight}
          // onChange={handleChange}
          // required
          className="input input-bordered w-full"
          {...register('personalInfo.weight', { valueAsNumber: true })}
        />
        {errors.personalInfo?.weight && <p className="text-red-500">{errors.personalInfo.weight.message}</p>}
      </div>
      <div className="flex flex-col gap-4">
        <label className="label label-text">Weekly Activities</label>
        {fields.map((field, index) => (
          <div key={field.id} className="mb-2 flex">
            <input
              {...register(`personalInfo.weeklyActivities.${index}`)}
              className="mr-2 flex-grow rounded border p-2"
            />
            <button type="button" onClick={() => remove(index)} className="btn">
              Remove
            </button>
          </div>
        ))}

        {/* {formData.weeklyActivities.map((activity, index) => (
            <input
              key={index}
              type="text"
              value={activity}
              onChange={(e) => handleActivityChange(index, e.target.value)}
              className="input input-bordered w-full"
            />
          ))} */}
      </div>
      <button type="button" onClick={() => append('')} className="btn btn-outline btn-sm w-fit text-xs text-gray-500">
        Add activity <PlusCircleIcon className="h-5 w-5" />
      </button>

      <button
        type="submit"
        className="btn btn-neutral mt-4 w-full"
        onClick={handleNext}
        disabled={!isPersonalInfoValid}
      >
        Next
      </button>
    </div>
  )
}

export default PersonalInfoForm
