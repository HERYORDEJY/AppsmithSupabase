import React from 'react';
import {StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {TabsNavigationStackParamList} from '~/navigation/types.ts';
import Home from '~/screens/home/Home.tsx';
import Orders from '~/screens/Orders/Orders.tsx';
import Products from '~/screens/Products/Products.tsx';
import Profile from '~/screens/Profile/Profile.tsx';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const {Navigator, Screen} =
  createBottomTabNavigator<TabsNavigationStackParamList>();

export default function TabsNavigationStack(): React.JSX.Element {
  return (
    <Navigator screenOptions={{headerShown: false}}>
      <Screen
        name={'Home'}
        component={Home}
        options={{
          tabBarIcon: () => (
            <MaterialCommunityIcons name="home" size={24} color="black" />
          ),
        }}
      />
      <Screen name={'Orders'} component={Orders} />
      <Screen name={'Products'} component={Products} />
      <Screen name={'Profile'} component={Profile} />
    </Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    //
  },
});
