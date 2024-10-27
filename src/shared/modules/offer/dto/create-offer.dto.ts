import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsEnum,
  IsInt,
  //IsMongoId,
  IsNumber,
  IsObject,
  IsString,
  IsUrl,
  Length,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { Cities } from '../../../../const.js';
import { OfferTypes } from '../../../../const.js';
import { Goods } from '../../../types/goods.type.js';
import { Location } from '../../../types/location.type.js';
import { CreateOfferValidationMessage } from './create-offer.messages.js';

export class CreateOfferDto {
  @MinLength(10, { message: CreateOfferValidationMessage.title.minLength })
  @MaxLength(100, { message: CreateOfferValidationMessage.title.maxLength })
  @IsString({ message: CreateOfferValidationMessage.title.invalidFormat })
  public title: string;

  @MinLength(20, {
    message: CreateOfferValidationMessage.description.minLength,
  })
  @MaxLength(1024, {
    message: CreateOfferValidationMessage.description.maxLength,
  })
  public description: string;

  @IsDateString(
    {},
    { message: CreateOfferValidationMessage.postDate.invalidFormat }
  )
  public postDate: Date;

  @IsEnum(Cities, { message: CreateOfferValidationMessage.city.invalid })
  public city: Cities;

  @IsString({
    message: CreateOfferValidationMessage.previewImage.invalidFormat,
  })
  @IsUrl(
    { protocols: ['http', 'https'] },
    { message: CreateOfferValidationMessage.previewImage.invalidFormat }
  )
  public previewImage: string;

  @IsArray({ message: CreateOfferValidationMessage.images.invalidFormat })
  @Length(6, 6, { message: CreateOfferValidationMessage.images.length })
  public images: string[];

  @IsBoolean({ message: CreateOfferValidationMessage.isPremium.invalidFormat })
  public isPremium: boolean;

  @IsBoolean({ message: CreateOfferValidationMessage.isFavorite.invalidFormat })
  public isFavorite: boolean;

  @IsNumber(
    { maxDecimalPlaces: 1 },
    { message: CreateOfferValidationMessage.rating.invalidFormat }
  )
  @Min(1, { message: CreateOfferValidationMessage.rating.minValue })
  @Max(5, { message: CreateOfferValidationMessage.rating.maxValue })
  public rating: number;

  @IsEnum(OfferTypes, { message: CreateOfferValidationMessage.type.invalid })
  public type: OfferTypes;

  @IsInt({ message: CreateOfferValidationMessage.rooms.invalidFormat })
  @Min(1, { message: CreateOfferValidationMessage.rooms.minValue })
  @Max(8, { message: CreateOfferValidationMessage.rooms.maxValue })
  public rooms: number;

  @IsInt({ message: CreateOfferValidationMessage.guests.invalidFormat })
  @Min(1, { message: CreateOfferValidationMessage.guests.minValue })
  @Max(10, { message: CreateOfferValidationMessage.guests.maxValue })
  public guests: number;

  @IsInt({ message: CreateOfferValidationMessage.price.invalidFormat })
  @Min(100, { message: CreateOfferValidationMessage.price.minValue })
  @Max(100000, { message: CreateOfferValidationMessage.price.maxValue })
  public price: number;

  @IsArray({ message: CreateOfferValidationMessage.goods.invalidFormat })
  public goods: Goods[];

  public userId: string;

  @IsObject({ message: CreateOfferValidationMessage.location.invalidFormat })
  public location: Location;
}
