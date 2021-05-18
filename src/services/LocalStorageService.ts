import { LOCAL_STORAGE_KEYS } from 'constants/general';
import { Headers } from 'utils/types';

type Storage = { [index: string]: string | undefined };
const tempStorage: Storage = {};

const getEncodedFieldName = (key: string) =>
  window.btoa(`@@${'react-training-express'.replace(/-/g, '_').toUpperCase()}:${key}`);

const getValue = (key: string) => {
  const encodedKey = getEncodedFieldName(key);
  let encodedValue = undefined;
  try {
    encodedValue = window.localStorage.getItem(encodedKey);
  } catch (e) {
    encodedValue = tempStorage[encodedKey];
  }
  const stringValue = encodedValue && window.atob(encodedValue);

  return stringValue && JSON.parse(stringValue);
};

const setValue = (key: string, value: any) => {
  const encodedKey = getEncodedFieldName(key);
  const stringValue = JSON.stringify(value);
  const encodedValue = window.btoa(stringValue);

  try {
    window.localStorage.setItem(encodedKey, encodedValue);
  } catch (e) {
    tempStorage[encodedKey] = encodedValue;
  }
};

const removeValue = (key: string) => {
  const encodedKey = getEncodedFieldName(key);
  try {
    window.localStorage.removeItem(encodedKey);
  } catch (e) {
    tempStorage[encodedKey] = undefined;
  }
};

const setAuthHeaders = (headers: Headers) => {
  const { client, token, uid } = headers;
  setValue(LOCAL_STORAGE_KEYS.client, client);
  setValue(LOCAL_STORAGE_KEYS.session, token);
  setValue(LOCAL_STORAGE_KEYS.uid, uid);
};

const removeAuthHeaders = () => {
  removeValue(LOCAL_STORAGE_KEYS.client);
  removeValue(LOCAL_STORAGE_KEYS.session);
  removeValue(LOCAL_STORAGE_KEYS.uid);
};

const LocalStorageService = {
  getValue,
  setValue,
  removeValue,
  setAuthHeaders,
  removeAuthHeaders
};

export default LocalStorageService;
