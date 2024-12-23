import React, { useState } from 'react';
import {
  Keyboard,
  View,
  Pressable,
  Text,
  TouchableWithoutFeedback,
  SafeAreaView,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps, NativeStackNavigationProp } from '@react-navigation/native-stack';

import FormField from '@/components/FormField';
import { BackButton } from '@/components/NavBar';
import { AuthStackParamList } from '@/navigation/types';
import { colors } from '@/themes';

import { LoginError, useGetUserSessionMutation } from './redux/api';
import styles from './styles';
import { LoginCredentials, LoginFields } from './types';

type NavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Login'>;
type LoginScreenProps = NativeStackScreenProps<AuthStackParamList, 'Login'>;

const LoginScreen: React.FC<LoginScreenProps> = ({
  route: {
    params: { previousScreen },
  },
}) => {
  const navigation = useNavigation<NavigationProp>();

  const [loginForm, setLoginForm] = useState<LoginCredentials>({
    username: '',
    password: '',
  });
  const [errorState, setErrorState] = useState<LoginError | null>();

  const [getUserSession] = useGetUserSessionMutation();

  const handleBack = () => {
    if (previousScreen === 'Welcome') {
      navigation.goBack();
    } else {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Welcome' }],
      });
    }
  };

  const handleFocus = () => {
    if (errorState) {
      setErrorState(null);
    }
  };

  const handleFormValue = (name: LoginFields, value: string) => {
    setLoginForm(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    try {
      await getUserSession(loginForm).unwrap();
    } catch (error) {
      setErrorState(error as LoginError);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <BackButton style={styles.backButton} iconColor={colors.darkGray} handleBack={handleBack} />
        <View style={styles.content}>
          <Text style={styles.title}>Welcome to Referendum</Text>
          <View style={styles.inputContainer}>
            <FormField
              name="username"
              errorState={errorState}
              placeholder="Email"
              value={loginForm.username}
              onChangeValue={handleFormValue}
              onFocus={handleFocus}
              autoCapitalize="none"
              keyboardType="email-address"
              placeholderTextColor={colors.mediumGray}
            />
            <FormField
              name="password"
              errorState={errorState}
              placeholder="Password"
              value={loginForm.password}
              onChangeValue={handleFormValue}
              onFocus={handleFocus}
              secureTextEntry
              placeholderTextColor={colors.mediumGray}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Pressable style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.loginButtonText}>Continue</Text>
            </Pressable>
          </View>
          <View style={styles.dividerHorizontal} />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;
