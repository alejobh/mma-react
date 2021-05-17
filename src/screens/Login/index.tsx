import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { useHistory, Link } from 'react-router-dom';
import { useMutation } from 'react-query';

import logo from 'assets/logo.png';
import Input from 'components/Input';
import Loading from 'components/Spinner/components/loading';
import api from 'config/api';
import PATHS from 'constants/paths';
import { LOCAL_STORAGE_KEYS, RESPONSE_STATUS } from 'constants/general';
import LocalStorageService from 'services/LocalStorageService';
import { login } from 'services/userService';
import { requiredValidation, emailValidation } from 'utils/formValidations';
import { LoginValues, Error } from 'utils/types';

import styles from './styles.module.scss';

function Login() {
  const [errorStatus, setErrorStatus] = useState('');
  const { t } = useTranslation();
  const history = useHistory();

  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm<LoginValues>();

  const { error, isLoading, mutate, reset } = useMutation((data: LoginValues) => login(data), {
    onSuccess: ({ client, token, uid }) => {
      LocalStorageService.setValue(LOCAL_STORAGE_KEYS.client, client);
      LocalStorageService.setValue(LOCAL_STORAGE_KEYS.session, token);
      LocalStorageService.setValue(LOCAL_STORAGE_KEYS.uid, uid);
      api.setHeaders({
        'access-token': token || '',
        client: client || '',
        uid: uid || ''
      });
      history.push(PATHS.home);
    },
    onError: (err: Error) => {
      const errorMessage =
        err.status === RESPONSE_STATUS.unauthorized ? 'Login:invalidCredentials' : 'Common:submitError';
      setErrorStatus(errorMessage);
    }
  });

  const onSubmit = handleSubmit(formData => {
    reset();
    mutate(formData);
  });

  return (
    <div className="column center">
      <div className={`column center full-width ${styles.container}`}>
        <img className={styles.logo} src={logo} alt="Wolox logo" />
        <div className={`column center full-width ${styles.containerForm}`}>
          <form className={`column full-width ${styles.form}`} onSubmit={onSubmit}>
            <Input
              label={t('Common:email')}
              name="email"
              error={errors.email?.message}
              inputRef={register(emailValidation(t))}
            />
            <Input
              label={t('Common:password')}
              name="password"
              type="password"
              error={errors.password?.message}
              inputRef={register(requiredValidation(t))}
            />
            {isLoading ? (
              <Loading className="self-center" />
            ) : (
              <button className="btn" type="submit">
                {t('Common:login')}
              </button>
            )}
            {error && <span className={`text-error ${styles.submitMessage}`}>{t(errorStatus)}</span>}
          </form>
          <Link className="btn secondary" to={PATHS.signUp}>
            {t('Common:signup')}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
