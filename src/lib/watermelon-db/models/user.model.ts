import {Model} from '@nozbe/watermelondb';
import {date, field, readonly, text} from '@nozbe/watermelondb/decorators';

class UserModel extends Model {
  static table = 'users';

  static columns = [
    'id',
    'created_at',
    'user_id',
    'email',
    'first_name',
    'last_name',
    'sex',
    'date_of_birth',
    'is_active',
    'updated_at',
  ];

  // @ts-ignore
  @readonly @date('created_at') created_at!: Date;
  // @ts-ignore
  @readonly @date('updated_at') updated_at!: Date;
  // @ts-ignore
  @text('user_id') userId: string;
  // @ts-ignore
  @text('email') email: string;
  // @ts-ignore
  @text('first_name') first_name: string;
  // @ts-ignore
  @text('last_name') last_name: string;
  // @ts-ignore
  @text('sex') sex: 'male' | 'female';
  // @ts-ignore
  @field('date_of_birth') date_of_birth: Date;
  // @ts-ignore
  @field('is_active') is_active: boolean;
}
