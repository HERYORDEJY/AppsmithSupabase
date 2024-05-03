import {Database} from '@nozbe/watermelondb';
import {schemaMigrations} from '@nozbe/watermelondb/Schema/migrations';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import {Platform} from 'react-native';
import {setGenerator} from '@nozbe/watermelondb/utils/common/randomId';
import {uuid} from '@supabase/supabase-js/dist/main/lib/helpers';
import {watermelonAppSchema} from '~/lib/watermelon-db/schemas';

export const watermelonSchemaMigrations = schemaMigrations({
  migrations: [
    // We'll add migration definitions here later
  ],
});

const watermelonAdapter = new SQLiteAdapter({
  schema: watermelonAppSchema,
  migrations: watermelonSchemaMigrations,
  jsi: Platform.OS === 'ios' /* Platform.OS === 'ios' */,
  onSetUpError: error => {
    console.error('\n\n onSetUpError :>> \t\t', error, '\n\n---');
  },
  dbName: process.env.WATERMELON_DB_NAME,
});

// Then, make a Watermelon database from it!
export const watermelonDatabase = new Database({
  adapter: watermelonAdapter,
  modelClasses: [],
});

// We need to setup the random id generator to use UUID v4
// so the Ids are the same format as on the Supabase server
// Otherwise Postgres will complain.
setGenerator(() => uuid());
