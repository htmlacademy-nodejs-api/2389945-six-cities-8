import { getModelForClass, prop } from '@typegoose/typegoose';
import { City, Offer, Image } from '../../types/index.js';

const FieldProps = {
  MIN_TITLE_LENGTH: 10,
  MAX_TITLE_LENGTH: 100,
  MIN_DESCRIPTION_LENGTH: 20,
  MAX_DESCRIPTION_LENGTH: 1024,
  IMAGES_COUNT: 6,
};

export class OfferEntity implements Offer {
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

  @prop({
    required: true,
  })
  public postDate: Date;

  @prop({
    required: true,
  })
  public city: City;

  @prop({
    required: true,
  })
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
  public images: Image[];

  @prop({
    required: true,
  })
  public isPremium: boolean;

  @prop({
    required: true,
  })
  public isFavorite: boolean;

  /*
  rating: number;
  type: OfferTypes;
  rooms: number;
  guests: number;
  price: number;
  goods: Goods[];
  user: User;
  location: Location;
*/

/*
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
  */
}

export const OfferModel = getModelForClass(OfferEntity);
