// components/PersonalInfoForm.tsx
'use client'

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
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="planName" className="block mb-1">
          Plan Name
        </label>
        <input
          type="text"
          id="planName"
          name="planName"
          value={formData.planName}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div>
        <label htmlFor="birthdate" className="block mb-1">
          Date of Birth
        </label>
        <input
          type="date"
          id="birthdate"
          name="birthdate"
          value={formData.birthdate}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div>
        <label htmlFor="height" className="block mb-1">
          Height (cm)
        </label>
        <input
          type="number"
          id="height"
          name="height"
          value={formData.height}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div>
        <label htmlFor="weight" className="block mb-1">
          Weight (kg)
        </label>
        <input
          type="number"
          id="weight"
          name="weight"
          value={formData.weight}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div>
        <label className="block mb-1">Weekly Activities</label>
        {formData.weeklyActivities.map((activity, index) => (
          <input
            key={index}
            type="text"
            value={activity}
            onChange={(e) => handleActivityChange(index, e.target.value)}
            className="w-full px-3 py-2 border rounded mb-2"
          />
        ))}
        <button type="button" onClick={addActivity} className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Activity
        </button>
      </div>
      <button type="submit" className="w-full bg-green-500 text-white py-2 rounded">
        Next
      </button>
    </form>
  )
}

export default PersonalInfoForm
