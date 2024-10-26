import {
  IsMongoId,
  IsString,
  Min,
  Max,
  MinLength,
  MaxLength,
  IsDateString,
  IsNumber,
} from 'class-validator';
import { CreateCommentValidationMessage } from './create-comment.messages.js';

export class CreateCommentDto {
  @IsMongoId({ message: CreateCommentValidationMessage.offerId.invalidId })
  public offerId: string;

  @MinLength(10, { message: CreateCommentValidationMessage.text.minLength })
  @MaxLength(100, { message: CreateCommentValidationMessage.text.maxLength })
  @IsString({ message: CreateCommentValidationMessage.text.invalidFormat })
  public text: string;

  @IsDateString(
    {},
    { message: CreateCommentValidationMessage.postDate.invalidFormat }
  )
  public postDate: Date;

  @IsNumber(
    { maxDecimalPlaces: 1 },
    { message: CreateCommentValidationMessage.rating.invalidFormat }
  )
  @Min(1, { message: CreateCommentValidationMessage.rating.minValue })
  @Max(5, { message: CreateCommentValidationMessage.rating.maxValue })
  public rating: number;

  @IsMongoId({ message: CreateCommentValidationMessage.userId.invalidId })
  public userId: string;
}
