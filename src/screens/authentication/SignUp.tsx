import React, {useState} from 'react';
import {ActivityIndicator, Alert, StyleSheet, Text, View} from 'react-native';
import {Button, Input} from 'react-native-elements';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AuthenticationNavigationStackParamList} from '~/navigation/types.ts';
import {supabaseClient} from '~/lib/supabase';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation =
    useNavigation<
      NavigationProp<AuthenticationNavigationStackParamList, 'SignUp'>
    >();

  async function signUpWithEmail() {
    setLoading(true);
    const {
      data: {session, user},
      error,
    } = await supabaseClient.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      Alert.alert(error.message);
      console.error('\n\n error :>> \t\t', error.message, '\n\n---');
    }
    if (!session) {
      Alert.alert('Please check your inbox for email verification!');
      console.error(
        '\n\n session :>> \t\t',
        'Please check your inbox for email verification!',
        '\n\n---',
      );
    }

    console.log(
      '\n\n session :>> \t\t',
      JSON.stringify({session, user}),
      '\n\n---',
    );

    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Sign up</Text>
      </View>

      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Input
          label="Email"
          leftIcon={{type: 'font-awesome', name: 'envelope'}}
          onChangeText={text => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          autoCapitalize={'none'}
          editable={!loading}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Input
          label="Password"
          leftIcon={{type: 'font-awesome', name: 'lock'}}
          onChangeText={text => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
          autoCapitalize={'none'}
          editable={!loading}
        />
      </View>

      <View
        style={[
          styles.verticallySpaced,
          loading && {
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
          },
        ]}
      >
        {loading ? (
          <ActivityIndicator size={'large'} color={'blue'} />
        ) : (
          <Button
            title="Sign up"
            disabled={loading}
            onPress={() => signUpWithEmail()}
            style={{width: '100%'}}
          />
        )}
      </View>

      <View style={styles.dontHaveAccount}>
        <Text
          style={styles.dontHaveAccountText}
          onPress={() => navigation.navigate('SignIn')}
        >
          Don't have an account? Sign in
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    padding: 16,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
  dontHaveAccount: {
    marginVertical: 20,
    alignItems: 'center',
  },
  dontHaveAccountText: {
    paddingVertical: 10,
  },
  header: {
    paddingVertical: 20,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
  },
});
