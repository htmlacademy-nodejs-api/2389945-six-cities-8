import { UserDto } from '../user/user.dto';

export class CommentDto {
  public id!: string;
  public date!: string;
  public user!: UserDto;
  public comment!: string;
  public rating!: number;
}
