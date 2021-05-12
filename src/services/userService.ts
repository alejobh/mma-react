import api from 'config/api';
import { ApiError } from 'utils/types';

import LocalStorageService from './LocalStorageService';

export const signUp = <T>(data: T) => api.post<Response, ApiError>('/users', data);

export const login = <T>(data: T) =>
  api.post<Response, Error>('/users/sign_in', data).then(response => {
    const token = response.headers?.['access-token'];
    LocalStorageService.setValue('session', token);
    return response;
  });
