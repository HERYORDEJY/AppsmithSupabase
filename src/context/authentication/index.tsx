import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import {Text} from 'react-native';
import {getWatermelonDb} from '~/lib/watermelon-db/utils/get-db.ts';
import {
  AuthenticationContextType,
  UserType,
} from '~/context/authentication/types.ts';
import {supabaseClient} from '~/lib/supabase';

export const AuthenticationContext =
  createContext<AuthenticationContextType | null>(null);
export const watermelonUserLocalStorageKey =
  process.env.WATERMELON_USER_LOCAL_STORAGE_KEY;

export default function AuthenticationContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isAppReady, setIsAppReady] = useState<boolean>(false);
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    if (!watermelonUserLocalStorageKey) {
      throw new Error('Watermelon user local storage key is not defined');
    }

    try {
      const db = getWatermelonDb();
      // We use WMDB's localStorage instead of AsyncStorage
      const user = await db.localStorage.get<string>(
        watermelonUserLocalStorageKey!,
      );
      if (user) setUser(JSON.parse(user));

      setIsAppReady(true);
    } catch (error) {
      console.error('\n\n load :>> \t\t', error, '\n\n---');
    }
  };

  const onSignIn = async (user: UserType) => {
    try {
      setUser(user);
      const db = getWatermelonDb();
      return await db.localStorage.set(
        watermelonUserLocalStorageKey!,
        JSON.stringify(user),
      );
    } catch (error) {
      console.error('\n\n onSignIn :>> \t\t', error, '\n\n---');
    }
  };

  const onSignUp = async (user: UserType) => {
    try {
      setUser(user);
      const db = getWatermelonDb();
      return await db.localStorage.set(
        watermelonUserLocalStorageKey!,
        JSON.stringify(user),
      );
    } catch (error) {
      console.error('\n\n onSignUp :>> \t\t', error, '\n\n---');
    }
  };

  const onSignOut = async () => {
    try {
      setUser(null);

      const db = getWatermelonDb();
      // Once logout is done, we reset the database to blank state
      // to avoid leaving data on the device for the next user
      return db.write(() => {
        return db.unsafeResetDatabase();
      });
    } catch (error) {
      console.error('\n\n onSignOut :>> \t\t', error, '\n\n---');
    }
  };

  useEffect(() => {
    // Listen for changes to authentication state
    const {data} = supabaseClient.auth.onAuthStateChange(
      async (event, session) => {
        // setSession(session);
        setUser(session ? {email: session.user.email!} : null);
        // setInitialized(true);
      },
    );
    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthenticationContext.Provider
      value={{user, onSignIn, onSignOut, onSignUp, isAppReady}}
    >
      {children}
    </AuthenticationContext.Provider>
  );
}

export function AuthenticationGuard({children}: {children: ReactNode}) {
  const auth = useContext(AuthenticationContext);

  if (!auth) {
    throw new Error('AuthGuard must be used within an AuthContextProvider');
  }

  if (!auth.isAppReady) {
    return <Text>Loading</Text>;
  }

  if (!auth.user?.email) {
    return; // <Redirect href='/login' />;
  }

  return children;
}
