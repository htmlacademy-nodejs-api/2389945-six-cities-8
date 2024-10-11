import mongoose from 'mongoose';
import { inject, injectable } from 'inversify';
import { DocumentType, types } from '@typegoose/typegoose';
import { CommentService } from './comment-service.interface.js';
import { Component } from '../../types/index.js';
import { CommentEntity } from './comment.entity.js';
import { CreateCommentDto } from './dto/create-comment.dto.js';
import { Rating } from '../../../const.js';

@injectable()
export class DefaultCommentService implements CommentService {
  constructor(
    @inject(Component.CommentModel)
    private readonly commentModel: types.ModelType<CommentEntity>
  ) {}

  public async create(
    dto: CreateCommentDto
  ): Promise<DocumentType<CommentEntity>> {
    const comment = await this.commentModel.create(dto);
    return comment.populate('userId');
  }

  public async findByOfferId(
    offerId: string
  ): Promise<DocumentType<CommentEntity>[]> {
    return this.commentModel.find({ offerId }).populate('userId');
  }

  public async deleteByOfferId(offerId: string): Promise<number> {
    const result = await this.commentModel.deleteMany({ offerId }).exec();

    return result.deletedCount;
  }

  public async calcRating(offerId: string): Promise<number> {
    const commentData = await this.commentModel.aggregate([
      { $match: { offerId: new mongoose.Types.ObjectId(offerId) } },
      {
        $group: {
          _id: null,
          averageRating: { $avg: '$rating' },
        },
      },
      { $unset: '_id' },
    ]);

    if (commentData.length === 0) {
      return Rating.Min;
    }

    return parseFloat(commentData[0].averageRating.toFixed(1));
  }

  public async calcCommentsCount(offerId: string): Promise<number> {
    const commentData = await this.commentModel.aggregate([
      { $match: { offerId: new mongoose.Types.ObjectId(offerId) } },
      {
        $group: {
          _id: null,
          count: { $sum: 1 },
        },
      },
      { $unset: '_id' },
    ]);

    if (commentData.length === 0) {
      return 0;
    }

    return commentData[0].count;
  }
}
