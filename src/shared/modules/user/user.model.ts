import { Schema, Document, model } from 'mongoose';
import { User } from '../../types/index.js';

export interface UserDocument extends User, Document {
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: [2, 'Min length for name is 2'],
    },
    email: {
      type: String,
      unique: true,
    },
    avatarPath: {
      type: String,
      required: true,
      minlength: [5, 'Min length for avatar path is 5'],
    },
    password: String,
    isPro: Boolean,
  },
  { timestamps: true }
);

export const UserModel = model<UserDocument>('User', userSchema);
