import api from 'config/api';
import { SignUpValues } from 'utils/types';

export const signUp = (data: any) => api.post('/users', data);
