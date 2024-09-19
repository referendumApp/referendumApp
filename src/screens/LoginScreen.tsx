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
import { useDispatch } from 'react-redux';
import { login } from '../redux/slices/authSlice';
import { colors, componentStyles, typography } from '../styles/globalStyles';

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const dispatch = useDispatch();

  const handleLogin = (): void => {
    // TODO: Implement actual login logic with API call
    console.log('Login attempt with:', email, password);
    dispatch(login({ id: '1', username: email })); // Using email as username for now
  };

  const handleSignUp = (): void => {
    // TODO: Implement navigation to sign up screen
    console.log('Navigate to sign up');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <View style={styles.content}>
          <Text style={styles.logo}>🇺🇸</Text>
          <Text style={styles.title}>Welcome to Referendum</Text>
          <Text style={styles.subtitle}>Your platform for democratic engagement</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Log In</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
            <Text style={styles.signUpButtonText}>Don't have an account? Sign up!</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...componentStyles.container,
    backgroundColor: colors.oldGloryBlue,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    fontSize: 100,
    marginBottom: 20,
  },
  title: {
    ...typography.title,
    marginBottom: 10,
  },
  subtitle: {
    ...typography.subtitle,
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    width: '80%',
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
  },
  loginButton: {
    ...componentStyles.button,
    width: '80%',
    backgroundColor: colors.oldGloryRed,
  },
  loginButtonText: componentStyles.buttonText,
  signUpButton: {
    marginTop: 15,
  },
  signUpButtonText: {
    ...componentStyles.buttonText,
    fontWeight: 'semibold',
  },
});

export default LoginScreen;
