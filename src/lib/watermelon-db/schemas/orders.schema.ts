import {tableSchema} from '@nozbe/watermelondb';

export const ordersSchema = tableSchema({
  name: 'orders',
  columns: [
    {name: 'created_at', type: 'number'},
    {name: 'user_id', type: 'string'},
    {name: 'total_amount', type: 'number'},
    {name: 'delivery_address', type: 'string'},
    {name: 'delivery_zipcode', type: 'number'},
    {name: 'delivery_city', type: 'string'},
    {name: 'product_name', type: 'string'},
    {name: 'order_quantity', type: 'number'},
    {name: 'updated_at', type: 'number'},
  ],
});
