import {createClient} from '@supabase/supabase-js';
import {MmkvStorageAdapter} from '~/utils/mmkv-adapter.ts';
import {AppState} from 'react-native';
import 'react-native-url-polyfill/auto';

export const supabaseClient = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!,
  {
    auth: {
      storage: MmkvStorageAdapter,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  },
);

// Tells Supabase Auth to continuously refresh the session automatically
// if the app is in the foreground. When this is added, you will continue
// to receive `onAuthStateChange` events with the `TOKEN_REFRESHED` or
// `SIGNED_OUT` event if the user's session is terminated. This should
// only be registered once.
AppState.addEventListener('change', state => {
  if (state === 'active') {
    supabaseClient.auth
      .startAutoRefresh()
      .then(r => console.log('\n\n startAutoRefresh :>> \t\t', r, '\n\n---'))
      .catch(e =>
        console.error('\n\n startAutoRefresh :>> \t\t', e, '\n\n---'),
      );
  } else {
    supabaseClient.auth
      .stopAutoRefresh()
      .then(r => console.log('\n\n stopAutoRefresh :>> \t\t', r, '\n\n---'))
      .catch(e => console.error('\n\n stopAutoRefresh :>> \t\t', e, '\n\n---'));
  }
});
