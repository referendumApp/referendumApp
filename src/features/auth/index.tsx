import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import { useGetUserSessionMutation } from '@/features/auth/api';
import { useTheme } from '@/themes/ThemeProvider';

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [getUserSession] = useGetUserSessionMutation();
  const theme = useTheme();

  const handleLogin = (): void => {
    getUserSession({ password, username: email });
  };

  const handleSignUp = (): void => {
    console.log('Navigate to sign up');
  };

  const styles = StyleSheet.create({
    container: {
      ...theme.componentStyles.container,
      backgroundColor: theme.colors.oldGloryBlue,
    },
    keyboardAvoidingView: {
      flex: 1,
    },
    content: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: theme.size.xl,
    },
    logo: {
      fontSize: 100,
      marginBottom: theme.size.xl,
    },
    title: {
      ...theme.typography.title,
      marginBottom: theme.size.s,
    },
    subtitle: {
      ...theme.typography.subtitle,
      textAlign: 'center',
      marginBottom: theme.size.xl,
    },
    input: {
      ...theme.componentStyles.input,
      width: '80%',
      marginBottom: theme.size.m,
    },
    loginButton: {
      ...theme.buttonStyles.medium,
      width: '80%',
      backgroundColor: theme.colors.oldGloryRed,
    },
    loginButtonText: {
      ...theme.componentStyles.boldText,
      color: theme.colors.white,
    },
    signUpButton: {
      marginTop: theme.size.m,
    },
    signUpButtonText: {
      ...theme.componentStyles.boldText,
      color: theme.colors.white,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}>
        <View style={styles.content}>
          <Text style={styles.logo}>🇺🇸</Text>
          <Text style={styles.title}>Welcome to Referendum</Text>
          <Text style={styles.subtitle}>
            Your platform for democratic engagement
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            placeholderTextColor={theme.colors.mediumGray}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholderTextColor={theme.colors.mediumGray}
          />
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Log In</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
            <Text style={styles.signUpButtonText}>
              Don't have an account? Sign up!
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;
