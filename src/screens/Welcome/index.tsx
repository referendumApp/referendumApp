import React from 'react';
import { View, Pressable, Text, SafeAreaView } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import Logo from '@/assets/logo.svg';
import { AuthStackParamList } from '@/navigation/types';

import styles from './styles';

type NavigationProp = StackNavigationProp<AuthStackParamList, 'Welcome'>;

const WelcomeScreen: React.FC = React.memo(() => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Referendum</Text>
        <Text style={styles.subtitle}>Empower yourself</Text>
        <View style={styles.logoContainer}>
          <Logo height={200} width={200} />
        </View>
        <View style={styles.buttonContainer}>
          <Pressable style={styles.loginButton} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginButtonText}>Login</Text>
          </Pressable>
          <Pressable style={styles.signUpButton} onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.signUpButtonText}>Create Account</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
});

export default WelcomeScreen;