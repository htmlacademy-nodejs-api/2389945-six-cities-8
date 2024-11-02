import { IsString, ValidateNested } from 'class-validator';
import { Cities } from '../../../../const.js';
import { City } from '../../../../../src/shared/types/city.type.js';
import { Location } from '../../../../../src/shared/types/location.type.js';
import { CreateOfferValidationMessage } from './create-offer.messages.js';

export class CityDto implements City {
  @IsString({
    each: true,
    message: CreateOfferValidationMessage.city.invalid,
  })
  public name: Cities;

  @ValidateNested()
  public location: Location;
}
