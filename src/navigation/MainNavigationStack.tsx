import React from 'react';
import {StyleSheet} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {MainNavigationStackParamList} from '~/navigation/types.ts';
import TabsNavigationStack from '~/navigation/TabsNavigationStack.tsx';

const {Navigator, Screen} =
  createNativeStackNavigator<MainNavigationStackParamList>();

export default function MainNavigationStack(): React.JSX.Element {
  return (
    <Navigator initialRouteName={'Tabs'} screenOptions={{headerShown: false}}>
      <Screen name={'Tabs'} component={TabsNavigationStack} />
    </Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    //
  },
});
