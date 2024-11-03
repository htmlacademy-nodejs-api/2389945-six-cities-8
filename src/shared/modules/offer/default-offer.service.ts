import { inject, injectable } from 'inversify';
import { DocumentType, types } from '@typegoose/typegoose';
import { OfferService } from './offer-service.interface.js';
import { Component } from '../../types/index.js';
import { Logger } from '../../libs/logger/index.js';
import { OfferEntity } from './offer.entity.js';
//import { CommentEntity } from './../comment/comment.entity.js';
import { UserEntity } from '../user/user.entity.js';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';
import { Cities } from '../../../const.js';
import { DEFAULT_PREMIUM_OFFER_COUNT } from './offer.constant.js';
import { SortType } from '../../types/sort-type.enum.js';
import { HttpError } from '../../libs/rest/index.js';
import { StatusCodes } from 'http-status-codes';

@injectable()
export class DefaultOfferService implements OfferService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.OfferModel)
    private readonly offerModel: types.ModelType<OfferEntity>,
    //@inject(Component.CommentModel)
    //private readonly commentModel: types.ModelType<CommentEntity>,
    @inject(Component.UserModel)
    private readonly userModel: types.ModelType<UserEntity>
  ) {}

  public async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(dto);
    this.logger.info(`New offer created: ${dto.title}`);

    return result;
  }

  public async findById(
    offerId: string
  ): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel.findById(offerId).populate(['userId']).exec();
  }

  public async find(): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel.find().populate(['userId']).exec();
  }

  public async deleteById(
    offerId: string
  ): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel.findByIdAndDelete(offerId).exec();
  }

  public async updateById(
    offerId: string,
    dto: UpdateOfferDto
  ): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, dto, { new: true })
      .populate(['userId'])
      .exec();
  }

  public async exists(documentId: string): Promise<boolean> {
    return (await this.offerModel.exists({ _id: documentId })) !== null;
  }

  public async incCommentCount(
    offerId: string
  ): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, {
        $inc: {
          commentCount: 1,
        },
      })
      .exec();
  }

  async findPremiumByCity(cityName: Cities): Promise<OfferEntity[] | null> {
    return this.offerModel
      .find({
        city: cityName,
        isPremium: true,
      })
      .sort({ createdAt: SortType.Down })
      .limit(DEFAULT_PREMIUM_OFFER_COUNT)
      .populate(['userId'])
      .exec();
  }

  async findFavorites(favoritesId: string[]): Promise<OfferEntity[] | null> {
    if (!favoritesId.length) {
      return [];
    }
    const offers = await this.offerModel
      .find({ _id: { $in: favoritesId } })
      .populate(['userId'])
      .exec();

    offers.map((offer) => {
      offer.isFavorite = true;
    });

    return offers;
  }

  private async postFavorite(
    user: DocumentType<UserEntity>,
    offerId: string
  ): Promise<void> {
    if (user.favoriteOffers.includes(offerId)) {
      throw new HttpError(
        StatusCodes.CONFLICT,
        `User with id "${user.id}" already has an offer with id "${offerId}" in favorites`,
        'DefaultOfferService'
      );
    }
    user.favoriteOffers.push(offerId);
  }

  private async deleteFavorite(
    user: DocumentType<UserEntity>,
    offerId: string
  ): Promise<void> {
    if (!user.favoriteOffers.includes(offerId)) {
      throw new HttpError(
        StatusCodes.CONFLICT,
        `User with id "${user.id}" has not an offer with id "${offerId}" in favorites`,
        'DefaultOfferService'
      );
    }

    user.favoriteOffers = (await user).favoriteOffers.filter(
      (id) => id !== offerId
    );
  }

  async modifyFavorite(
    userId: string,
    offerId: string,
    method: string
  ): Promise<DocumentType<OfferEntity> | null> {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `User with id "${userId}" not found`,
        'DefaultOfferService'
      );
    }
    const offer = await this.findById(offerId);
    if (!offer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id "${offerId}" not found`,
        'DefaultOfferService'
      );
    }

    if (method === 'POST') {
      await this.postFavorite(user, offerId);
      offer.isFavorite = true;
    } else if (method === 'DELETE') {
      await this.deleteFavorite(user, offerId);
      offer.isFavorite = false;
    } else {
      throw new HttpError(
        StatusCodes.BAD_REQUEST,
        'action must be POST or DELETE',
        'DefaultOfferService'
      );
    }

    await this.userModel
      .findByIdAndUpdate(userId, { favoriteOffers: user.favoriteOffers })
      .exec();

    return offer;
  }
}
