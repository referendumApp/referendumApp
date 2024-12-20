import React, { useState, useCallback, useMemo } from 'react';
import {
  Keyboard,
  View,
  Pressable,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  SafeAreaView,
} from 'react-native';

import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import FormField from '@/components/FormField';
import { BackButton } from '@/components/NavBar';
import { SettingsStackParamList } from '@/navigation/types';
import { RootState } from '@/store';
import { colors } from '@/themes';

import { PasswordResetError, usePasswordResetMutation } from './api';
import styles from './styles';
import { PasswordResetCredentials, PasswordResetFields } from './types';


type PasswordResetForm = PasswordResetCredentials & { confirmPassword: string };

type NavigationProp = NativeStackNavigationProp<SettingsStackParamList, 'PasswordReset'>;


const PasswordResetScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [passwordReset] = usePasswordResetMutation();
  const currentUser  = useSelector((state: RootState) => state.auth.user?.user);

  const [isPasswordChanged, setIsPasswordChanged] = useState<boolean>(false);
  const [passwordResetForm, setPasswordResetForm] = useState<PasswordResetForm>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [errorState, setErrorState] = useState<PasswordResetError | null>();

  const handleFocus = () => {
    if (errorState) {
      setErrorState(null);
    }
  };

  const handleFormValue = (name: PasswordResetFields, value: string) => {
    setPasswordResetForm(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePasswordReset = useCallback(async() => {
    const { currentPassword, newPassword, confirmPassword } = passwordResetForm;

    if (newPassword !== confirmPassword) {
      setErrorState({ field: 'newPassword', message: "Passwords don't match. Please try again" });
      return;
    }

    try {
      await passwordReset({ currentPassword, newPassword }).unwrap();
      setIsPasswordChanged(true);
    } catch (error) {
      setErrorState(error as PasswordResetError);
    }
  }, [currentUser, navigation, passwordResetForm, passwordReset]);

  const isPasswordResetValid = useMemo(() => {
    if (errorState) return false;

    const { currentPassword, newPassword, confirmPassword } = passwordResetForm;

    return Boolean(currentPassword && newPassword && confirmPassword);
  }, [errorState, passwordResetForm]);

  if (isPasswordChanged) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Password Reset</Text>
          <Text style={styles.body}>Your password has been successfully updated!</Text>
        </View>
        <View style={styles.successButtonContainer}>
          <Pressable
            style={[styles.button]}
            onPress={() => navigation.popToTop()}
          >
            <Text style={styles.buttonText}>Back to Settings</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <BackButton 
        style={styles.backButton} 
        iconColor={colors.darkGray} 
        handleBack={() => navigation.goBack()} 
      />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.content}>
          <Text style={styles.title}>Password Reset</Text>
          <View style={styles.inputContainer}>
            <Text style={[styles.errorMsg, errorState && errorState?.field && styles.noDisplay]}>
              {errorState?.message}
            </Text>
            <FormField 
              name="currentPassword"
              errorState={errorState}
              placeholder="Current Password"
              value={passwordResetForm.currentPassword}
              onChangeValue={handleFormValue}
              onFocus={handleFocus}
              secureTextEntry
              placeholderTextColor={colors.mediumGray}
            />
            <FormField 
              name="newPassword"
              errorState={errorState}
              placeholder="New Password"
              value={passwordResetForm.newPassword}
              onChangeValue={handleFormValue}
              onFocus={handleFocus}
              secureTextEntry
              placeholderTextColor={colors.mediumGray}
            />
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              value={passwordResetForm.confirmPassword}
              onChangeText={(text: string) =>
                setPasswordResetForm(prev => ({
                  ...prev,
                  confirmPassword: text,
                }))
              }
              onFocus={handleFocus}
              secureTextEntry
              placeholderTextColor={colors.mediumGray}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Pressable
              style={[styles.button, !isPasswordResetValid && styles.disabledButton]}
              onPress={handlePasswordReset}
              disabled={!isPasswordResetValid}
            >
              <Text style={styles.buttonText}>Confirm</Text>
            </Pressable>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  )
};

export default PasswordResetScreen;