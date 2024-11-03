import {
  IsDateString,
  IsEnum,
  IsInt,
  IsMongoId,
  IsOptional,
  IsString,
  IsBoolean,
  IsUrl,
  IsArray,
  IsObject,
  Max,
  MaxLength,
  Min,
  MinLength,
  Length,
  IsNumber,
} from 'class-validator';
import { Cities, OfferTypes } from '../../../../const.js';
import { Goods } from '../../../types/goods.type.js';
import { Location } from '../../../types/location.type.js';
import { CreateUpdateOfferMessage } from './update-offer.messages.js';

export class UpdateOfferDto {
  @IsOptional()
  @MinLength(10, { message: CreateUpdateOfferMessage.title.minLength })
  @MaxLength(100, { message: CreateUpdateOfferMessage.title.maxLength })
  @IsString({ message: CreateUpdateOfferMessage.title.invalidFormat })
  public title?: string;

  @IsOptional()
  @MinLength(20, {
    message: CreateUpdateOfferMessage.description.minLength,
  })
  @MaxLength(1024, {
    message: CreateUpdateOfferMessage.description.maxLength,
  })
  public description?: string;

  @IsOptional()
  @IsDateString(
    {},
    { message: CreateUpdateOfferMessage.postDate.invalidFormat }
  )
  public postDate?: Date;

  @IsOptional()
  @IsEnum(Cities, { message: CreateUpdateOfferMessage.city.invalid })
  public city?: Cities;

  @IsOptional()
  @IsString({
    message: CreateUpdateOfferMessage.previewImage.invalidFormat,
  })
  @IsUrl(
    { protocols: ['http', 'https'] },
    { message: CreateUpdateOfferMessage.previewImage.invalidFormat }
  )
  public previewImage?: string;

  @IsOptional()
  @IsArray({ message: CreateUpdateOfferMessage.images.invalidFormat })
  @Length(6, 6, { message: CreateUpdateOfferMessage.images.length })
  public images?: string[];

  @IsOptional()
  @IsBoolean({ message: CreateUpdateOfferMessage.isPremium.invalidFormat })
  public isPremium?: boolean;

  @IsOptional()
  @IsBoolean({ message: CreateUpdateOfferMessage.isFavorite.invalidFormat })
  public isFavorite?: boolean;

  @IsOptional()
  @IsNumber(
    { maxDecimalPlaces: 1 },
    { message: CreateUpdateOfferMessage.rating.invalidFormat }
  )
  @Min(1, { message: CreateUpdateOfferMessage.rating.minValue })
  @Max(5, { message: CreateUpdateOfferMessage.rating.maxValue })
  public rating?: number;

  @IsOptional()
  @IsEnum(OfferTypes, { message: CreateUpdateOfferMessage.type.invalid })
  public type?: OfferTypes;

  @IsOptional()
  @IsInt({ message: CreateUpdateOfferMessage.bedrooms.invalidFormat })
  @Min(1, { message: CreateUpdateOfferMessage.bedrooms.minValue })
  @Max(8, { message: CreateUpdateOfferMessage.bedrooms.maxValue })
  public bedrooms?: number;

  @IsOptional()
  @IsInt({ message: CreateUpdateOfferMessage.maxAdults.invalidFormat })
  @Min(1, { message: CreateUpdateOfferMessage.maxAdults.minValue })
  @Max(10, { message: CreateUpdateOfferMessage.maxAdults.maxValue })
  public maxAdults?: number;

  @IsOptional()
  @IsInt({ message: CreateUpdateOfferMessage.price.invalidFormat })
  @Min(100, { message: CreateUpdateOfferMessage.price.minValue })
  @Max(100000, { message: CreateUpdateOfferMessage.price.maxValue })
  public price?: number;

  @IsOptional()
  @IsArray({ message: CreateUpdateOfferMessage.goods.invalidFormat })
  public goods?: Goods[];

  @IsOptional()
  @IsMongoId({ message: CreateUpdateOfferMessage.userId.invalidId })
  public userId?: string;

  @IsOptional()
  @IsObject({ message: CreateUpdateOfferMessage.location.invalidFormat })
  public location?: Location;
}
