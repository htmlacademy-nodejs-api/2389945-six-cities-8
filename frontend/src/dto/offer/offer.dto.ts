import { City, Location, Type } from '../../types/types';
import { UserDto } from '../user/user.dto';

export class OfferDto {
  public id!: string;
  public title!: string;
  public description!: string;
  public postDate!: string;
  public city!: City;
  public previewImage!: string;
  public images!: string[];
  public isPremium!: boolean;
  public isFavorite!: boolean;
  public rating!: number;
  public type!: Type;
  public bedrooms!: number;
  public maxAdults!: number;
  public price!: number;
  public goods!: string[];
  public user!: UserDto;
  public location!: Location;
  public reviewsCount!: number;
}
