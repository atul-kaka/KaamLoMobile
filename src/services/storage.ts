import { MMKV } from 'react-native-mmkv';

// Create MMKV storage instance with error handling
let storage: MMKV;
let mmkvAvailable = false;

try {
  storage = new MMKV({
    id: 'kaamlo-storage',
    encryptionKey: 'kaamlo-encryption-key-2024', // In production, use a secure key
  });
  mmkvAvailable = true;
} catch (error) {
  console.warn('MMKV initialization failed, using fallback:', error);
  mmkvAvailable = false;
  // Create a dummy storage object to prevent crashes
  storage = {} as MMKV;
}

// Fallback in-memory storage
const memoryStorage: Record<string, string> = {};

// Storage helper functions
export const StorageService = {
  // String operations
  setString: (key: string, value: string): void => {
    try {
      if (mmkvAvailable && storage) {
        storage.set(key, value);
      } else {
        memoryStorage[key] = value;
      }
    } catch (error) {
      console.warn('Error setting string in storage:', error);
      memoryStorage[key] = value;
    }
  },

  getString: (key: string, defaultValue?: string): string | undefined => {
    try {
      if (mmkvAvailable && storage) {
        return storage.getString(key) ?? defaultValue;
      } else {
        return memoryStorage[key] ?? defaultValue;
      }
    } catch (error) {
      console.warn('Error getting string from storage:', error);
      return memoryStorage[key] ?? defaultValue;
    }
  },

  // Number operations
  setNumber: (key: string, value: number): void => {
    try {
      if (mmkvAvailable && storage) {
        storage.set(key, value);
      } else {
        memoryStorage[key] = String(value);
      }
    } catch (error) {
      console.warn('Error setting number in storage:', error);
      memoryStorage[key] = String(value);
    }
  },

  getNumber: (key: string, defaultValue?: number): number | undefined => {
    try {
      if (mmkvAvailable && storage) {
        return storage.getNumber(key) ?? defaultValue;
      } else {
        const value = memoryStorage[key];
        return value ? Number(value) : defaultValue;
      }
    } catch (error) {
      console.warn('Error getting number from storage:', error);
      const value = memoryStorage[key];
      return value ? Number(value) : defaultValue;
    }
  },

  // Boolean operations
  setBoolean: (key: string, value: boolean): void => {
    try {
      if (mmkvAvailable && storage) {
        storage.set(key, value);
      } else {
        memoryStorage[key] = String(value);
      }
    } catch (error) {
      console.warn('Error setting boolean in storage:', error);
      memoryStorage[key] = String(value);
    }
  },

  getBoolean: (key: string, defaultValue?: boolean): boolean | undefined => {
    try {
      if (mmkvAvailable && storage) {
        return storage.getBoolean(key) ?? defaultValue;
      } else {
        const value = memoryStorage[key];
        return value !== undefined ? value === 'true' : defaultValue;
      }
    } catch (error) {
      console.warn('Error getting boolean from storage:', error);
      const value = memoryStorage[key];
      return value !== undefined ? value === 'true' : defaultValue;
    }
  },

  // Object operations (JSON)
  setObject: <T>(key: string, value: T): void => {
    try {
      const jsonValue = JSON.stringify(value);
      if (mmkvAvailable && storage) {
        storage.set(key, jsonValue);
      } else {
        memoryStorage[key] = jsonValue;
      }
    } catch (error) {
      console.warn('Error setting object in storage:', error);
      memoryStorage[key] = JSON.stringify(value);
    }
  },

  getObject: <T>(key: string, defaultValue?: T): T | undefined => {
    try {
      const value = mmkvAvailable && storage 
        ? storage.getString(key) 
        : memoryStorage[key];
      if (value) {
        try {
          return JSON.parse(value) as T;
        } catch (error) {
          console.error(`Error parsing JSON for key ${key}:`, error);
          return defaultValue;
        }
      }
      return defaultValue;
    } catch (error) {
      console.warn('Error getting object from storage:', error);
      return defaultValue;
    }
  },

  // Delete operations
  delete: (key: string): void => {
    try {
      if (mmkvAvailable && storage) {
        storage.delete(key);
      } else {
        delete memoryStorage[key];
      }
    } catch (error) {
      console.warn('Error deleting from storage:', error);
      delete memoryStorage[key];
    }
  },

  // Check if key exists
  contains: (key: string): boolean => {
    try {
      if (mmkvAvailable && storage) {
        return storage.contains(key);
      } else {
        return key in memoryStorage;
      }
    } catch (error) {
      console.warn('Error checking key in storage:', error);
      return key in memoryStorage;
    }
  },

  // Get all keys
  getAllKeys: (): string[] => {
    try {
      if (mmkvAvailable && storage) {
        return storage.getAllKeys();
      } else {
        return Object.keys(memoryStorage);
      }
    } catch (error) {
      console.warn('Error getting all keys from storage:', error);
      return Object.keys(memoryStorage);
    }
  },

  // Clear all data
  clearAll: (): void => {
    try {
      if (mmkvAvailable && storage) {
        storage.clearAll();
      } else {
        Object.keys(memoryStorage).forEach(key => delete memoryStorage[key]);
      }
    } catch (error) {
      console.warn('Error clearing storage:', error);
      Object.keys(memoryStorage).forEach(key => delete memoryStorage[key]);
    }
  },
};

// Storage keys constants
export const StorageKeys = {
  LANGUAGE: 'language',
  FAVORITES: 'favorites',
  USER_PREFERENCES: 'user_preferences',
  CACHE_TIMESTAMP: 'cache_timestamp',
} as const;

