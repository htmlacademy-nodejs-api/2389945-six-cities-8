import { Cities, OfferTypes } from '../../../../const.js';
import { Goods } from '../../../types/goods.type.js';
import { Location } from '../../../types/location.type.js';

export class UpdateOfferDto {
  public title: string;
  public description: string;
  public postDate: Date;
  public city: Cities;
  public previewImage: string;
  public images: string[];
  public isPremium: boolean;
  public isFavorite: boolean;
  public rating: number;
  public type: OfferTypes;
  public rooms: number;
  public guests: number;
  public price: number;
  public goods: Goods[];
  public userId: string;
  public location: Location;
}
