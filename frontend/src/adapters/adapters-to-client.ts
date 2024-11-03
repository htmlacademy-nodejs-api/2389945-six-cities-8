import { UserType } from '../const';
import { OfferDto } from '../dto/offer/offer.dto';
import { CommentDto } from '../dto/comment/comment.dto';
import { UserDto } from '../dto/user/user.dto';
import { Comment, Offer, User } from '../types/types';

const adaptUserTypeToClient = (userType: boolean): UserType => {
  switch (userType) {
    case false:
      return UserType.Regular;
    case true:
      return UserType.Pro;
    default:
      return UserType.Regular;
  }
};

export const adaptLoginToClient = (user: UserDto): User => ({
  name: user.name,
  email: user.email,
  avatarUrl: user.avatarUrl,
  type: adaptUserTypeToClient(user.isPro),
});

export const adaptUserToClient = (user: UserDto): User => ({
  name: user.name,
  type: adaptUserTypeToClient(user.isPro),
  email: user.email,
  avatarUrl: user.avatarUrl,
});

export const adaptOfferToClient = (offer: OfferDto): Offer => ({
  id: offer.id,
  title: offer.title,
  description: '',
  previewImage: offer.previewImage,
  images: [],
  bedrooms: 0,
  maxAdults: 0,
  isPremium: offer.isPremium,
  isFavorite: offer.isFavorite,
  type: offer.type,
  price: offer.price,
  rating: offer.rating,
  location: offer.city.location,
  city: offer.city,
  goods: [],
  host: {
    name: '',
    avatarUrl: '',
    type: UserType.Regular,
    email: '',
  },
});

export const adaptCommentToClient = (comment: CommentDto): Comment => ({
  id: comment.id,
  comment: comment.comment,
  date: comment.date,
  rating: comment.rating,
  user: adaptUserToClient(comment.user),
});

export const adaptOffersToClient = (offers: OfferDto[]): Offer[] =>
  offers.map((offer) => adaptOfferToClient(offer));

export const adaptCommentsToClient = (comments: CommentDto[]): Comment[] =>
  comments.map((comment) => adaptCommentToClient(comment));
