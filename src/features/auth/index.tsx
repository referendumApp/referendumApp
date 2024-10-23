import React, {useState} from 'react';
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
// import {useDispatch} from 'react-redux';
import {useGetUserSessionMutation} from '@features/auth/api';
import {useTheme} from '@styles/ThemeProvider';

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [getUserSession] = useGetUserSessionMutation();
  // const dispatch = useDispatch();
  const theme = useTheme();

  const handleLogin = (): void => {
    console.log('Login attempt with:', email, password);
    getUserSession({password, username: email});
    // dispatch(login({id: '1', username: email}));
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
      padding: theme.spacing.xl,
    },
    logo: {
      fontSize: 100,
      marginBottom: theme.spacing.xl,
    },
    title: {
      ...theme.typography.title,
      marginBottom: theme.spacing.s,
    },
    subtitle: {
      ...theme.typography.subtitle,
      textAlign: 'center',
      marginBottom: theme.spacing.xl,
    },
    input: {
      ...theme.componentStyles.input,
      width: '80%',
      marginBottom: theme.spacing.m,
    },
    loginButton: {
      ...theme.componentStyles.button,
      width: '80%',
    },
    loginButtonText: theme.componentStyles.buttonText,
    signUpButton: {
      marginTop: theme.spacing.m,
    },
    signUpButtonText: {
      ...theme.componentStyles.buttonText,
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
