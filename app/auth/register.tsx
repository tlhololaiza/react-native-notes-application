import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, SafeAreaView, StyleSheet } from 'react-native';
import { AuthForm } from '../../components/auth/AuthForm';
import { Colors } from '../../constants/Colors';
import { useAuth } from '../../hooks/useAuth';

export default function RegisterScreen() {
  const router = useRouter();
  const { register } = useAuth();
  
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!email.trim() || !username.trim() || !password.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      await register(email.trim(), password, username.trim());
      Alert.alert(
        'Success', 
        'Account created successfully! Please login.',
        [{ text: 'OK', onPress: () => router.push('/auth/login') }]
      );
    } catch (error: any) {
      Alert.alert('Registration Failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <AuthForm
        type="register"
        email={email}
        password={password}
        username={username}
        onEmailChange={setEmail}
        onPasswordChange={setPassword}
        onUsernameChange={setUsername}
        onSubmit={handleRegister}
        onSwitchMode={() => router.push('/auth/login')}
        loading={loading}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});