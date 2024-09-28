import { getModelForClass, prop } from '@typegoose/typegoose';
import { User } from '../../types/index.js';

const minNameLength = 1;
const maxNameLength = 15;

const minPasswordLength = 6;
const maxPasswordLength = 12;

export class UserEntity implements User {
  @prop({
    required: true,
    minlength: [minNameLength, `Min length for name is ${minNameLength}`],
    maxlength: [maxNameLength, `Max length for name is ${maxNameLength}`],
  })
  public name: string;

  @prop({
    unique: true,
    required: true,
    match: [/^([\w-\\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Email is incorrect'],
  })
  public email: string;

  @prop({ required: false, default: 'avatar.jpg' })
  public avatarPath: string;

  @prop({
    required: true,
    minlength: [
      minPasswordLength,
      `Min length for password is ${minPasswordLength}`,
    ],
    maxlength: [
      maxPasswordLength,
      `Max length for password is ${maxPasswordLength}`,
    ],
  })
  public password: string;

  @prop({ required: true, default: false })
  public isPro: boolean;
}

export const UserModel = getModelForClass(UserEntity);
