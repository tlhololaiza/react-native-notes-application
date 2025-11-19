import { VALIDATION } from '../constants/Config';

export const validateEmail = (email: string): { valid: boolean; error?: string } => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!email) {
    return { valid: false, error: 'Email is required' };
  }
  
  if (!emailRegex.test(email)) {
    return { valid: false, error: 'Invalid email format' };
  }
  
  return { valid: true };
};

export const validatePassword = (password: string): { valid: boolean; error?: string } => {
  if (!password) {
    return { valid: false, error: 'Password is required' };
  }
  
  if (password.length < VALIDATION.MIN_PASSWORD_LENGTH) {
    return { 
      valid: false, 
      error: `Password must be at least ${VALIDATION.MIN_PASSWORD_LENGTH} characters` 
    };
  }
  
  return { valid: true };
};

export const validateUsername = (username: string): { valid: boolean; error?: string } => {
  if (!username) {
    return { valid: false, error: 'Username is required' };
  }
  
  if (username.length < VALIDATION.MIN_USERNAME_LENGTH) {
    return { 
      valid: false, 
      error: `Username must be at least ${VALIDATION.MIN_USERNAME_LENGTH} characters` 
    };
  }
  
  return { valid: true };
};