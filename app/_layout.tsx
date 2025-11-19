import { Stack } from 'expo-router';
import { AuthProvider } from '../context/AuthContext';
import { NotesProvider } from '../context/NotesContext';

export default function RootLayout() {
  return (
    <AuthProvider>
      <NotesProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="auth" />
          <Stack.Screen name="tabs" />
        </Stack>
      </NotesProvider>
    </AuthProvider>
  );
}