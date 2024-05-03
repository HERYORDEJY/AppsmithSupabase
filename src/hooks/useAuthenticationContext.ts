import {useContext} from 'react';
import {AuthenticationContext} from '~/context/authentication';

export function useAuthenticationContext() {
  const context = useContext(AuthenticationContext);

  if (!context) {
    throw new Error(
      'useAuthenticationContext must be used within an AuthenticationContextProvider',
    );
  }
  return context;
}
