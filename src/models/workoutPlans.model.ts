import mongoose, { Document, Model, Schema, Types } from 'mongoose'

export interface IWorkoutPlan {
  userId: Types.ObjectId
  planName: string
  birthdate: Date
  height: number
  weight: number
  weeklyActivities: string[]
  workoutGoal: string
  weeklyPlan: string
}

export interface IWorkoutPlanDocument extends IWorkoutPlan, Document<string> {
  createdAt: Date
  updatedAt: Date
}

const workoutPlansSchema = new Schema<IWorkoutPlan>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
    planName: { type: String, required: true },
    birthdate: { type: Date, required: true },
    height: { type: Number, required: true },
    weight: { type: Number, required: true },
    weeklyActivities: [String],
    workoutGoal: { type: String, required: true },
    weeklyPlan: { type: String, required: true },
  },
  { timestamps: true },
)

export const WorkoutPlans: Model<IWorkoutPlanDocument> =
  mongoose.models.WorkoutPlan || mongoose.model('WorkoutPlan', workoutPlansSchema)
