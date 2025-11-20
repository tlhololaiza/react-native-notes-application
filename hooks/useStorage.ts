import { useCallback, useEffect, useState } from 'react';
import { storageService } from '../services/storageService';

export const useStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load value from storage on mount
  useEffect(() => {
    loadStoredValue();
  }, [key]);

  const loadStoredValue = async () => {
    try {
      setLoading(true);
      setError(null);
      const value = await storageService.getItem<T>(key);
      if (value !== null) {
        setStoredValue(value);
      }
    } catch (err) {
      setError('Failed to load data');
      console.error('Error loading from storage:', err);
    } finally {
      setLoading(false);
    }
  };

  // Save value to storage
  const setValue = useCallback(async (value: T | ((val: T) => T)) => {
    try {
      setError(null);
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      await storageService.setItem(key, valueToStore);
    } catch (err) {
      setError('Failed to save data');
      console.error('Error saving to storage:', err);
      throw err;
    }
  }, [key, storedValue]);

  // Remove value from storage
  const removeValue = useCallback(async () => {
    try {
      setError(null);
      await storageService.removeItem(key);
      setStoredValue(initialValue);
    } catch (err) {
      setError('Failed to remove data');
      console.error('Error removing from storage:', err);
      throw err;
    }
  }, [key, initialValue]);

  // Refresh value from storage
  const refresh = useCallback(async () => {
    await loadStoredValue();
  }, [key]);

  return {
    value: storedValue,
    setValue,
    removeValue,
    refresh,
    loading,
    error,
  };
};

// Specific hook for AsyncStorage operations with better type safety
export const useAsyncStorage = <T>(key: string) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const getItem = useCallback(async (): Promise<T | null> => {
    setIsLoading(true);
    setError(null);
    try {
      const value = await storageService.getItem<T>(key);
      setData(value);
      return value;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error');
      setError(error);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [key]);

  const setItem = useCallback(async (value: T): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      await storageService.setItem(key, value);
      setData(value);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error');
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [key]);

  const removeItem = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      await storageService.removeItem(key);
      setData(null);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error');
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [key]);

  return {
    data,
    isLoading,
    error,
    getItem,
    setItem,
    removeItem,
  };
};