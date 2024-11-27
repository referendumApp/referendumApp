import React, { useState } from 'react';
import {
  Keyboard,
  View,
  Pressable,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  SafeAreaView,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { BackButton } from '@/components/NavBar';
import { AuthStackParamList } from '@/navigation/types';
import { colors } from '@/themes';

import { useGetUserSessionMutation } from './api';
import styles from './styles';

type NavigationProp = StackNavigationProp<AuthStackParamList, 'SignUp'>;

const LoginScreen: React.FC = React.memo(() => {
  const navigation = useNavigation<NavigationProp>();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [getUserSession] = useGetUserSessionMutation();

  const handleLogin = async () => {
    await getUserSession({ password, username: email });
  };

  return (
    <SafeAreaView style={styles.container}>
      <BackButton
        style={styles.backButton}
        iconColor={colors.darkGray}
        handleBack={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: 'Welcome' }],
          })
        }
      />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.content}>
          <Text style={styles.title}>Welcome to Referendum</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={(text: string) => setEmail(text)}
              autoCapitalize="none"
              keyboardType="email-address"
              placeholderTextColor={colors.mediumGray}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={(text: string) => setPassword(text)}
              secureTextEntry
              placeholderTextColor={colors.mediumGray}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Pressable style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.loginButtonText}>Continue</Text>
            </Pressable>
          </View>
        </View>
      </TouchableWithoutFeedback>
      <View style={styles.dividerHorizontal} />
    </SafeAreaView>
  );
});

export default LoginScreen;
