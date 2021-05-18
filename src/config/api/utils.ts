import api from '.';

const baseHeaders = ['Accept', 'Content-Type'];

const removeHeaders = () => {
  Object.keys(api.headers).forEach(header => {
    if (!baseHeaders.includes(header)) {
      api.deleteHeader(header);
    }
  });
};

const setHeaders = (headers: Record<string, string>) => {
  api.setHeaders(headers);
};

const apiUtils = {
  removeHeaders,
  setHeaders
};

export default apiUtils;
