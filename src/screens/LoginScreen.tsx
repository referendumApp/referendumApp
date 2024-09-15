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

interface LoginScreenProps {
  onLogin: () => void;
  onSignUp: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, onSignUp }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = (): void => {
    // TODO: Implement actual login logic
    console.log('Login attempt with:', email, password);
    onLogin();
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

          <TouchableOpacity style={styles.signUpButton} onPress={onSignUp}>
            <Text style={styles.signUpButtonText}>Don't have an account? Sign up!</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#002868', // oldGloryBlue
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
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
  },
  loginButton: {
    width: '100%',
    backgroundColor: '#BF0A30', // oldGloryRed
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
  },
  loginButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  signUpButton: {
    marginTop: 15,
  },
  signUpButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default LoginScreen;
