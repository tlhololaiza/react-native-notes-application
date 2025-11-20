import { STORAGE_KEYS } from '../constants/Config';
import { User } from '../types/auth.types';
import { validateEmail, validatePassword, validateUsername } from '../utils/validation';
import { storageService } from './storageService';

export const authService = {
  async getAllUsers(): Promise<User[]> {
    const users = await storageService.getItem<User[]>(STORAGE_KEYS.USERS);
    return users || [];
  },

  async register(email: string, password: string, username: string): Promise<User> {
    // Validate inputs
    const emailValidation = validateEmail(email);
    if (!emailValidation.valid) {
      throw new Error(emailValidation.error);
    }

    const passwordValidation = validatePassword(password);
    if (!passwordValidation.valid) {
      throw new Error(passwordValidation.error);
    }

    const usernameValidation = validateUsername(username);
    if (!usernameValidation.valid) {
      throw new Error(usernameValidation.error);
    }

    // Check if user already exists
    const users = await this.getAllUsers();
    const existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (existingUser) {
      throw new Error('Email already registered');
    }

    // Create new user
    const newUser: User = {
      id: Date.now().toString(),
      email,
      password,
      username,
    };

    // Save to storage
    await storageService.setItem(STORAGE_KEYS.USERS, [...users, newUser]);
    
    return newUser;
  },

  async login(email: string, password: string): Promise<User> {
    const users = await this.getAllUsers();
    const user = users.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (!user) {
      throw new Error('Invalid email or password');
    }

    await storageService.setItem(STORAGE_KEYS.CURRENT_USER, user);
    return user;
  },

  async logout(): Promise<void> {
    await storageService.removeItem(STORAGE_KEYS.CURRENT_USER);
  },

  async getCurrentUser(): Promise<User | null> {
    return await storageService.getItem<User>(STORAGE_KEYS.CURRENT_USER);
  },

  async updateProfile(userId: string, updates: Partial<User>): Promise<User> {
    const users = await this.getAllUsers();
    const userIndex = users.findIndex(u => u.id === userId);

    if (userIndex === -1) {
      throw new Error('User not found');
    }

    // Validate email if being updated
    if (updates.email) {
      const emailValidation = validateEmail(updates.email);
      if (!emailValidation.valid) {
        throw new Error(emailValidation.error);
      }

      // Check if email is already taken by another user
      const emailExists = users.find(
        u => u.email.toLowerCase() === updates.email!.toLowerCase() && u.id !== userId
      );
      if (emailExists) {
        throw new Error('Email already in use');
      }
    }

    // Validate password if being updated
    if (updates.password) {
      const passwordValidation = validatePassword(updates.password);
      if (!passwordValidation.valid) {
        throw new Error(passwordValidation.error);
      }
    }

    // Validate username if being updated
    if (updates.username) {
      const usernameValidation = validateUsername(updates.username);
      if (!usernameValidation.valid) {
        throw new Error(usernameValidation.error);
      }
    }

    const updatedUser = { ...users[userIndex], ...updates };
    users[userIndex] = updatedUser;

    await storageService.setItem(STORAGE_KEYS.USERS, users);
    await storageService.setItem(STORAGE_KEYS.CURRENT_USER, updatedUser);

    return updatedUser;
  }
};