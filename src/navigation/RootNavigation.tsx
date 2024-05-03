import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthenticationNavigationStack from '~/navigation/AuthenticationNavigationStack.tsx';
import {useAuthenticationContext} from '~/hooks/useAuthenticationContext.ts';
import MainNavigationStack from '~/navigation/MainNavigationStack.tsx';

export default function RootNavigation(): React.JSX.Element {
  const authenticationContext = useAuthenticationContext();
  return (
    <NavigationContainer>
      {authenticationContext.user?.email ? (
        <MainNavigationStack />
      ) : (
        <AuthenticationNavigationStack />
      )}
    </NavigationContainer>
  );
}
