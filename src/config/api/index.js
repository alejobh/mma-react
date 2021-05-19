import { create } from 'apisauce';
import { CamelcaseSerializer, SnakecaseSerializer } from 'cerealizr';

const snakeCase = new SnakecaseSerializer();
const camelCase = new CamelcaseSerializer();

const baseURL = 'https://books-training-rails.herokuapp.com/api/v1';

if (baseURL === 'http://wolox.com') {
  console.warn('API baseURL has not been properly initialized'); // eslint-disable-line no-console
}

const STATUS_CODES = {
  unauthorized: 401
};

const api = create({
  /*
   * TODO Add this if you need it
   * baseURL: process.env.API_BASE_URL,
   */
  baseURL,
  timeout: 15000
});

// eslint-disable-next-line no-unused-vars, prettier/prettier, @typescript-eslint/no-unused-vars
export const apiSetup = dispatch => {
  api.addMonitor(response => {
    if (response.status === STATUS_CODES.unauthorized) {
      /*
       * TODO: These callbacks should only be called if no other callback was asigned for the response.
       * - dispatch(alertActions.error(i18next.t('apiErrors:expired')));
       */
    }
  });

  api.addMonitor(response => {
    if (response.problem === 'NETWORK_ERROR') {
      // TODO: These callbacks should only be called if no other callback was asigned for the response.
    }
  });
};

api.addRequestTransform(request => {
  if (request.data) {
    request.data = snakeCase.serialize(request.data);
  } else if (request.params) {
    request.params = snakeCase.serialize(request.params);
  }
});

api.addResponseTransform(response => {
  if (response.ok) {
    response.data = camelCase.serialize(response.data);
  } else {
    const error = { errors: response.data.errors, status: response.status };
    throw error;
  }
});

export default api;
