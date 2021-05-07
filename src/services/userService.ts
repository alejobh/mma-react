import api from 'config/api';
import { ApiError } from 'utils/types';

export const signUp = <T>(data: T) => api.post<Response, ApiError>('/users', data);
