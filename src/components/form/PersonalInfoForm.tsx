// components/PersonalInfoForm.tsx
'use client'

import { PlusCircleIcon } from '@heroicons/react/24/outline'
import React, { useState } from 'react'

interface PersonalInfoFormProps {
  onSubmit: (data: PersonalInfoData) => void
}

export interface PersonalInfoData {
  planName: string
  birthdate: string
  height: number
  weight: number
  weeklyActivities: string[]
}

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<PersonalInfoData>({
    planName: '',
    birthdate: '',
    height: 0,
    weight: 0,
    weeklyActivities: [''],
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleActivityChange = (index: number, value: string) => {
    const newActivities = [...formData.weeklyActivities]
    newActivities[index] = value
    setFormData({ ...formData, weeklyActivities: newActivities })
  }

  const addActivity = () => {
    setFormData({ ...formData, weeklyActivities: [...formData.weeklyActivities, ''] })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-bold">Personal Info</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <div>
          <label htmlFor="planName" className="label label-text">
            Plan Name
          </label>
          <input
            type="text"
            id="planName"
            name="planName"
            value={formData.planName}
            onChange={handleChange}
            required
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label htmlFor="birthdate" className="label label-text">
            Date of Birth
          </label>
          <input
            type="date"
            id="birthdate"
            name="birthdate"
            value={formData.birthdate}
            onChange={handleChange}
            required
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label htmlFor="height" className="label label-text">
            Height (cm)
          </label>
          <input
            type="number"
            id="height"
            name="height"
            value={formData.height}
            onChange={handleChange}
            required
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label htmlFor="weight" className="label label-text">
            Weight (kg)
          </label>
          <input
            type="number"
            id="weight"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            required
            className="input input-bordered w-full"
          />
        </div>
        <div className="flex flex-col gap-4">
          <label className="label label-text">Weekly Activities</label>
          {formData.weeklyActivities.map((activity, index) => (
            <input
              key={index}
              type="text"
              value={activity}
              onChange={(e) => handleActivityChange(index, e.target.value)}
              className="input input-bordered w-full"
            />
          ))}
        </div>
        <button type="button" onClick={addActivity} className="btn btn-outline btn-sm w-fit text-xs text-gray-500">
          Add activity <PlusCircleIcon className="h-5 w-5" />
        </button>
        <button type="submit" className="btn btn-neutral mt-4 w-full">
          Next
        </button>
      </form>
    </div>
  )
}

export default PersonalInfoForm
