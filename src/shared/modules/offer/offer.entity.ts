import {
  defaultClasses,
  getModelForClass,
  prop,
  modelOptions,
  Ref
} from '@typegoose/typegoose';
import {
  City,
  Goods,
  Location,
} from '../../types/index.js';
import { OfferTypes } from '../../../const.js';
import { UserEntity } from '../user/user.entity.js';

const FieldProps = {
  MIN_TITLE_LENGTH: 10,
  MAX_TITLE_LENGTH: 100,
  MIN_DESCRIPTION_LENGTH: 20,
  MAX_DESCRIPTION_LENGTH: 1024,
  IMAGES_COUNT: 6,
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers',
    timestamps: true,
  },
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({
    required: true,
    minlength: [
      FieldProps.MIN_TITLE_LENGTH,
      `Min length for title is ${FieldProps.MIN_TITLE_LENGTH}`,
    ],
    maxlength: [
      FieldProps.MAX_TITLE_LENGTH,
      `Max length for title is ${FieldProps.MAX_TITLE_LENGTH}`,
    ],
  })
  public title: string;

  @prop({
    required: true,
    minlength: [
      FieldProps.MIN_DESCRIPTION_LENGTH,
      `Min length for title is ${FieldProps.MIN_DESCRIPTION_LENGTH}`,
    ],
    maxlength: [
      FieldProps.MAX_DESCRIPTION_LENGTH,
      `Max length for title is ${FieldProps.MAX_DESCRIPTION_LENGTH}`,
    ],
  })
  public description: string;

  @prop()
  public postDate: Date;

  @prop({
    required: true,
  })
  public city: City;

  @prop()
  public previewImage: string;

  @prop({
    required: true,
    minlength: [
      FieldProps.IMAGES_COUNT,
      `Min images count is ${FieldProps.IMAGES_COUNT}`,
    ],
    maxlength: [
      FieldProps.IMAGES_COUNT,
      `Max images count is ${FieldProps.IMAGES_COUNT}`,
    ],
  })
  public images: string[];

  @prop({
    required: true,
  })
  public isPremium: boolean;

  @prop({
    required: true,
  })
  public isFavorite: boolean;

  @prop({
    required: true,
    min: 1,
    max: 5,
  })
  public rating: number;

  @prop({
    required: true,
  })
  public type: OfferTypes;

  @prop({
    required: true,
    min: 1,
    max: 8,
  })
  public bedrooms: number;

  @prop({
    required: true,
    min: 1,
    max: 10,
  })
  public maxAdults: number;

  @prop({
    required: true,
    min: 100,
    max: 100000,
  })
  public price: number;

  @prop({
    required: true,
    minlength: 1,
  })
  public goods: Goods[];

  @prop({
    ref: UserEntity,
    required: true,
  })
  public userId: Ref<UserEntity>;

  @prop({
    required: true,
  })
  public location: Location;
}

export const OfferModel = getModelForClass(OfferEntity);
