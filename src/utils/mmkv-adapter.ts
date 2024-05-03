import {MMKV} from 'react-native-mmkv';

const storage = new MMKV();

export const MmkvStorageAdapter = {
  setItem: (key: string, value: any) => {
    storage.set(
      key,
      typeof value === 'string' || typeof value === 'number'
        ? value
        : JSON.stringify(value),
    );
    return Promise.resolve(true);
  },
  getItem: (key: string) => {
    const value = storage.getString(key);
    return Promise.resolve(value);
  },
  removeItem: (key: string) => {
    storage.delete(key);
    return Promise.resolve();
  },
};
