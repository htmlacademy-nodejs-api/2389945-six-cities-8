import {
  IsString,
  Min,
  Max,
  MinLength,
  MaxLength,
  IsNumber,
} from 'class-validator';
import { CreateCommentValidationMessage } from './create-comment.messages.js';

export class CreateCommentDto {
  public offerId: string;

  @MinLength(10, { message: CreateCommentValidationMessage.comment.minLength })
  @MaxLength(100, { message: CreateCommentValidationMessage.comment.maxLength })
  @IsString({ message: CreateCommentValidationMessage.comment.invalidFormat })
  public comment: string;

  @IsNumber(
    { maxDecimalPlaces: 1 },
    { message: CreateCommentValidationMessage.rating.invalidFormat }
  )
  @Min(1, { message: CreateCommentValidationMessage.rating.minValue })
  @Max(5, { message: CreateCommentValidationMessage.rating.maxValue })
  public rating: number;

  public userId: string;
}
