import { UserDto } from '../user/user.dto';

export class ReviewRdo {
  public id!: string;
  public date!: string;
  public user!: UserDto;
  public comment!: string;
  public rating!: number;
}
