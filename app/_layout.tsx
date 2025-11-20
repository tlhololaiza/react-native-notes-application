import { Slot } from 'expo-router';
import { AuthProvider } from '../context/AuthContext';
import { NotesProvider } from '../context/NotesContext';

export default function RootLayout() {
  return (
    <AuthProvider>
      <NotesProvider>
        <Slot />
      </NotesProvider>
    </AuthProvider>
  );
}