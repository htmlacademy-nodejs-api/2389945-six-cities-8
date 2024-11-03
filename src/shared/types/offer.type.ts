import { User, Location, Goods, City } from './index.js';
import { OfferTypes } from '../../const.js';

export type Offer = {
  title: string;
  description: string;
  postDate: Date;
  city: City;
  previewImage: string;
  images: string[];
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  type: OfferTypes;
  bedrooms: number;
  maxAdults: number;
  price: number;
  goods: Goods[];
  user: User;
  location: Location;
};
