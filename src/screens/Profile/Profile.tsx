import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import CustomScreenContainer from '~/components/general/CustomScreenContainer.tsx';
import {Button} from 'react-native-elements';
import {useAuthenticationContext} from '~/hooks/useAuthenticationContext.ts';

interface Props {
  //
}

export default function Profile(props: Props): React.JSX.Element {
  // hooks
  const authenticationContext = useAuthenticationContext();

  // helpers

  const onLogout = async () => {
    try {
      await authenticationContext?.onSignOut();
    } catch (error) {
      console.error('\n\n onLogout :>> \t\t', error, '\n\n---');
    }
  };

  // renders

  return (
    <CustomScreenContainer>
      <View style={styles.container}>
        <Text style={styles.text}>This is the Profile screen</Text>

        <Button title="Logout" onPress={onLogout}></Button>
      </View>
    </CustomScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'space-between',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 40,
  },
});
