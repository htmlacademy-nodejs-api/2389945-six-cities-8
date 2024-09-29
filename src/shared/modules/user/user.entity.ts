import {
  defaultClasses,
  getModelForClass,
  prop,
  modelOptions,
} from '@typegoose/typegoose';
import { User } from '../../types/index.js';
import { createSHA256 } from '../../helpers/index.js';

const minNameLength = 1;
const maxNameLength = 15;

const minPasswordLength = 6;
const maxPasswordLength = 12;

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface UserEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'users',
    timestamps: true,
  },
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class UserEntity extends defaultClasses.TimeStamps implements User {
  @prop({
    required: true,
    minlength: [minNameLength, `Min length for name is ${minNameLength}`],
    maxlength: [maxNameLength, `Max length for name is ${maxNameLength}`],
    default: '',
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
    default: '',
  })
  private password?: string;

  @prop({ required: true, default: false })
  public isPro: boolean;

  constructor(userData: User) {
    super();

    this.name = userData.name;
    this.email = userData.email;
    this.avatarPath = userData.avatarPath;
    this.isPro = userData.isPro;
  }

  public setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  public getPassword() {
    return this.password;
  }
}

export const UserModel = getModelForClass(UserEntity);
