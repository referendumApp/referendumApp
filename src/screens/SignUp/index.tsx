import React, { useCallback, useMemo, useState } from 'react';
import {
  Keyboard,
  View,
  Pressable,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import FormField from '@/components/FormField';
import { BackButton } from '@/components/NavBar';
import { AuthStackParamList } from '@/navigation/types';
import { colors } from '@/themes';

import { SignUpError, useSignUpUserMutation } from './redux/api';
import styles from './styles';
import { SignUpCredentials, SignUpFields } from './types';

type SignUpForm = SignUpCredentials & { confirmPassword: string };

type NavigationProp = NativeStackNavigationProp<AuthStackParamList, 'SignUp'>;

const SignUpScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  const [signUpForm, setSignUpForm] = useState<SignUpForm>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errorState, setErrorState] = useState<SignUpError | null>();

  const [signUpUser] = useSignUpUserMutation();

  const handleFocus = () => {
    if (errorState) {
      setErrorState(null);
    }
  };

  const handleFormValue = (name: SignUpFields, value: string) => {
    setSignUpForm(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignUp = useCallback(async () => {
    const { email, name, password, confirmPassword } = signUpForm;

    if (password !== confirmPassword) {
      setErrorState({ field: 'password', message: "Passwords don't match. Please try again" });
      return;
    }

    try {
      await signUpUser({ email, name, password }).unwrap();

      navigation.navigate('Login', { previousScreen: 'SignUp' });
    } catch (error) {
      setErrorState(error as SignUpError);
    }
  }, [navigation, signUpForm, signUpUser]);

  const isSignUpValid = useMemo(() => {
    if (errorState) return false;

    const { email, name, password } = signUpForm;

    return Boolean(email && password && name);
  }, [errorState, signUpForm]);

  return (
    <SafeAreaView style={styles.container}>
      <BackButton
        style={styles.backButton}
        iconColor={colors.darkGray}
        handleBack={() => navigation.goBack()}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.content}>
            <Text style={styles.title}>Create Account</Text>
            <View style={styles.inputContainer}>
              <Text style={[styles.errorMsg, errorState && errorState?.field && styles.noDisplay]}>
                {errorState?.message}
              </Text>
              <FormField
                name="name"
                errorState={errorState}
                placeholder="Name"
                value={signUpForm.name}
                onChangeValue={handleFormValue}
                onFocus={handleFocus}
                autoCapitalize="words"
                placeholderTextColor={colors.mediumGray}
              />
              <FormField
                name="email"
                errorState={errorState}
                placeholder="Email"
                value={signUpForm.email}
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
                value={signUpForm.password}
                onChangeValue={handleFormValue}
                onFocus={handleFocus}
                secureTextEntry
                placeholderTextColor={colors.mediumGray}
              />
              <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                value={signUpForm.confirmPassword}
                onChangeText={(text: string) =>
                  setSignUpForm(prev => ({
                    ...prev,
                    confirmPassword: text,
                  }))
                }
                onFocus={handleFocus}
                secureTextEntry
                placeholderTextColor={colors.mediumGray}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      <View style={styles.buttonContainer}>
        <Pressable
          style={[styles.loginButton, !isSignUpValid && styles.disabledButton]}
          onPress={handleSignUp}
          disabled={!isSignUpValid}>
          <Text style={styles.loginButtonText}>Continue</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default SignUpScreen;
