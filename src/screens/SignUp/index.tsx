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
import { StackNavigationProp } from '@react-navigation/stack';

import { BackButton } from '@/components/NavBar';
import ToolTip from '@/components/ToolTip';
import { AuthStackParamList } from '@/navigation/types';
import { colors } from '@/themes';

import { useSignUpUserMutation } from './api';
import styles from './styles';

type SignUpForm = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type NavigationProp = StackNavigationProp<AuthStackParamList, 'SignUp'>;

const SignUpScreen: React.FC = React.memo(() => {
  const navigation = useNavigation<NavigationProp>();

  const [signUpForm, setSignUpForm] = useState<SignUpForm>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [passwordError, setPasswordError] = useState<boolean>(false);

  const [signUpUser] = useSignUpUserMutation();

  const handleFocus = () => {
    if (passwordError) {
      setPasswordError(false);
    }
  };

  const handleSignUp = useCallback(async () => {
    const { email, name, password, confirmPassword } = signUpForm;

    if (password !== confirmPassword) {
      setPasswordError(true);
      return false;
    }

    try {
      await signUpUser({ email, name, password }).unwrap();

      navigation.navigate('Login');
    } catch (error) {
      setPasswordError(true);
    }
  }, [navigation, signUpForm, signUpUser]);

  const isSignUpValid = useMemo(() => {
    const { email, name, password } = signUpForm;

    return Boolean(email && password && name);
  }, [signUpForm]);

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
              <TextInput
                style={styles.input}
                placeholder="Name"
                value={signUpForm.name}
                onChangeText={(text: string) =>
                  setSignUpForm(prev => ({
                    ...prev,
                    name: text,
                  }))
                }
                onFocus={handleFocus}
                autoCapitalize="words"
                placeholderTextColor={colors.mediumGray}
              />
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={signUpForm.email}
                onChangeText={(text: string) =>
                  setSignUpForm(prev => ({
                    ...prev,
                    email: text,
                  }))
                }
                onFocus={handleFocus}
                autoCapitalize="none"
                keyboardType="email-address"
                placeholderTextColor={colors.mediumGray}
              />
              {passwordError && (
                <ToolTip
                  style={styles.tooltip}
                  text="Passwords don't match. Please try again"
                  isError={true}
                />
              )}
              <TextInput
                style={[styles.input, passwordError && styles.inputError]}
                placeholder="Password"
                value={signUpForm.password}
                onChangeText={(text: string) =>
                  setSignUpForm(prev => ({
                    ...prev,
                    password: text,
                  }))
                }
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
          style={[styles.loginButton, (!isSignUpValid || passwordError) && styles.disabledButton]}
          onPress={handleSignUp}
          disabled={!isSignUpValid}>
          <Text style={styles.loginButtonText}>Continue</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
});

export default SignUpScreen;
