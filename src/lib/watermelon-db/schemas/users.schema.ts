import {tableSchema} from '@nozbe/watermelondb';

export const usersSchema = tableSchema({
  name: 'users',
  columns: [
    // {name: 'id', type: 'string', isIndexed: true},
    {name: 'created_at', type: 'number'},
    {name: 'user_id', type: 'string', isIndexed: true},
    {name: 'email', type: 'string'},
    {name: 'first_name', type: 'string'},
    {name: 'last_name', type: 'string'},
    {name: 'sex', type: 'string'},
    {name: 'date_of_birth', type: 'string'},
    {name: 'is_active', type: 'boolean'},
    {name: 'updated_at', type: 'number'},
  ],
});
