import {appSchema} from '@nozbe/watermelondb';
import {usersSchema} from '~/lib/watermelon-db/schemas/users.schema.ts';
import {ordersSchema} from '~/lib/watermelon-db/schemas/orders.schema.ts';

export const watermelonAppSchema = appSchema({
  version: 1,
  tables: [usersSchema, ordersSchema],
});
