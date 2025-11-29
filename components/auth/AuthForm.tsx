import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../constants/Colors';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

interface AuthFormProps {
  type: 'login' | 'register';
  email: string;
  password: string;
  username?: string;
  onEmailChange: (text: string) => void;
  onPasswordChange: (text: string) => void;
  onUsernameChange?: (text: string) => void;
  onSubmit: () => void;
  onSwitchMode: () => void;
  loading?: boolean;
  errors?: {
    email?: string;
    password?: string;
    username?: string;
  };
}

export const AuthForm = ({
  type,
  email,
  password,
  username,
  onEmailChange,
  onPasswordChange,
  onUsernameChange,
  onSubmit,
  onSwitchMode,
  loading = false,
  errors = {},
}: AuthFormProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {type === 'login' ? 'Welcome Back' : 'Create Account'}
      </Text>
      <Text style={styles.subtitle}>
        {type === 'login' 
          ? 'Sign in to continue' 
          : 'Sign up to get started'}
      </Text>

      <View style={styles.form}>
        <Input
          label="Email"
          value={email}
          onChangeText={onEmailChange}
          placeholder="Enter your email"
          keyboardType="email-address"
          autoCapitalize="none"
          error={errors.email}
        />

        {type === 'register' && (
          <Input
            label="Username"
            value={username || ''}
            onChangeText={onUsernameChange}
            placeholder="Choose a username"
            autoCapitalize="none"
            error={errors.username}
          />
        )}

        <Input
          label="Password"
          value={password}
          onChangeText={onPasswordChange}
          placeholder="Enter your password"
          secureTextEntry
          error={errors.password}
        />

        <Button
          title={type === 'login' ? 'Login' : 'Register'}
          onPress={onSubmit}
          loading={loading}
          style={styles.submitButton}
        />
      </View>

      <TouchableOpacity onPress={onSwitchMode} style={styles.switchButton}>
        <Text style={styles.switchText}>
          {type === 'login' 
            ? "Don't have an account? " 
            : "Already have an account? "}
          <Text style={styles.switchTextBold}>
            {type === 'login' ? 'Register' : 'Login'}
          </Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginBottom: 32,
  },
  form: {
    marginBottom: 24,
  },
  submitButton: {
    marginTop: 8,
  },
  switchButton: {
    alignItems: 'center',
    padding: 12,
  },
  switchText: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  switchTextBold: {
    color: Colors.primary,
    fontWeight: '600',
  },
});