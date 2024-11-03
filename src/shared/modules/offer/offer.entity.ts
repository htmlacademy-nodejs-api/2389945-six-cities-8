import {
  defaultClasses,
  getModelForClass,
  prop,
  modelOptions,
  Ref,
} from '@typegoose/typegoose';
import { City, Goods, Location } from '../../types/index.js';
import { OfferTypes } from '../../../const.js';
import { UserEntity } from '../user/user.entity.js';
import { OfferFieldProps } from './const.js';

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
      OfferFieldProps.MIN_TITLE_LENGTH,
      `Min length for title is ${OfferFieldProps.MIN_TITLE_LENGTH}`,
    ],
    maxlength: [
      OfferFieldProps.MAX_TITLE_LENGTH,
      `Max length for title is ${OfferFieldProps.MAX_TITLE_LENGTH}`,
    ],
  })
  public title: string;

  @prop({
    required: true,
    minlength: [
      OfferFieldProps.MIN_DESCRIPTION_LENGTH,
      `Min length for title is ${OfferFieldProps.MIN_DESCRIPTION_LENGTH}`,
    ],
    maxlength: [
      OfferFieldProps.MAX_DESCRIPTION_LENGTH,
      `Max length for title is ${OfferFieldProps.MAX_DESCRIPTION_LENGTH}`,
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
      OfferFieldProps.IMAGES_COUNT,
      `Min images count is ${OfferFieldProps.IMAGES_COUNT}`,
    ],
    maxlength: [
      OfferFieldProps.IMAGES_COUNT,
      `Max images count is ${OfferFieldProps.IMAGES_COUNT}`,
    ],
  })
  public images: string[];

  @prop()
  public isPremium: boolean;

  public isFavorite: boolean;

  @prop()
  public rating: number;

  @prop({
    required: true,
  })
  public type: OfferTypes;

  @prop({
    required: true,
    min: OfferFieldProps.MIN_BEDROOMS,
    max: OfferFieldProps.MAX_BEDROOMS,
  })
  public bedrooms: number;

  @prop({
    required: true,
    min: OfferFieldProps.MIN_ADULTS,
    max: OfferFieldProps.MAX_ADULTS,
  })
  public maxAdults: number;

  @prop({
    required: true,
    min: OfferFieldProps.MIN_PRICE,
    max: OfferFieldProps.MAX_PRICE,
  })
  public price: number;

  @prop({
    required: true,
    minlength: OfferFieldProps.MIN_GOODS,
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
