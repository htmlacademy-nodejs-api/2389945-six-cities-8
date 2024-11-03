import { UserType } from '../const';
import CreateOfferDto from '../dto/offer/create-offer.dto';
import CreateUserDto from '../dto/user/create-user.dto';
import { UserDto } from '../dto/user/user.dto';
import { NewOffer, User, UserRegister } from '../types/types';

const adaptUserTypeToServer = (userType: UserType): boolean => {
  switch (userType) {
    case UserType.Regular:
      return false;
    case UserType.Pro:
      return true;
    default:
      return false;
  }
};

export const adaptSignupToServer = (user: UserRegister): CreateUserDto => ({
  name: user.name,
  isPro: adaptUserTypeToServer(user.type),
  email: user.email,
  password: user.password,
});

export const adaptUserToServer = (user: User): UserDto => ({
  name: user.name,
  isPro: adaptUserTypeToServer(user.type),
  email: user.email,
  avatarUrl: user.avatarUrl,
});

export const adaptNewOfferToServer = (offer: NewOffer): CreateOfferDto => ({
  title: offer.title,
  description: offer.description,
  postDate: new Date(),
  city: offer.city,
  previewImage: offer.previewImage,
  images: offer.images,
  bedrooms: offer.bedrooms,
  maxAdults: offer.maxAdults,
  type: offer.type,
  isPremium: offer.isPremium,
  rating: 0,
  price: offer.price,
  goods: offer.goods,
  location: offer.location,
  userId: '',
});
