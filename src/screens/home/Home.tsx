import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import CustomScreenContainer from '~/components/general/CustomScreenContainer.tsx';

interface Props {
  //
}

export default function Home(props: Props): React.JSX.Element {
  return (
    <CustomScreenContainer>
      <View style={styles.container}>
        <Text style={styles.text}>This is the Home screen</Text>
      </View>
    </CustomScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 40,
  },
});
