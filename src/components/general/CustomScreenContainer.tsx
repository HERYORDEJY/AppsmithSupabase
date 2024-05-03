import React, {PropsWithChildren} from 'react';
import {StatusBar, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

interface Props extends PropsWithChildren {
  //
}

export default function CustomScreenContainer(props: Props): React.JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={'default'}
        backgroundColor={'transparent'}
        translucent={true}
      />
      {props.children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1',
  },
});
