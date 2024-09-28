import { Image, User, Location, City, Goods } from './index.js';
import { OfferTypes } from '../../const.js';

export type Offer = {
  title: string;
  description: string;
  postDate: Date;
  city: City;
  previewImage: string;
  images: Image[];
  isPremium: string;
  isFavorite: string;
  rating: number;
  type: OfferTypes;
  rooms: number;
  guests: number;
  price: number;
  goods: Goods[];
  user: User;
  location: Location;
};
