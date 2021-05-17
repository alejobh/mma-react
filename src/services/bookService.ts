import api from 'config/api';

export const getBookList = () => api.get('/books');
