import React from 'react';
import {StyleSheet} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignIn from '~/screens/authentication/SignIn.tsx';
import SignUp from '~/screens/authentication/SignUp.tsx';
import {AuthenticationNavigationStackParamList} from '~/navigation/types.ts';

const {Navigator, Screen} =
  createNativeStackNavigator<AuthenticationNavigationStackParamList>();

export default function AuthenticationNavigationStack(): React.JSX.Element {
  return (
    <Navigator initialRouteName={'SignIn'} screenOptions={{headerShown: false}}>
      <Screen name={'SignIn'} component={SignIn} />
      <Screen name={'SignUp'} component={SignUp} />
    </Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    //
  },
});
