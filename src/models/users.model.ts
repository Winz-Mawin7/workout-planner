import mongoose, { Document, Model, Schema } from 'mongoose'

export interface IUser {
  email: string
  password: string
}

export interface IUserDocument extends IUser, Document<string> {
  createdAt: Date
  updatedAt: Date
}

const usersSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  },
)

export const Users: Model<IUserDocument> = mongoose.models.Users || mongoose.model('Users', usersSchema)
