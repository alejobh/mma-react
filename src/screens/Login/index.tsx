import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { useHistory, Link } from 'react-router-dom';
import { useMutation } from 'react-query';

import logo from 'assets/logo.png';
import Input from 'components/Input';
import Loading from 'components/Spinner/components/loading';
import { ROUTES } from 'components/Router/constants';
import { Error } from 'config/apiTypes';
import { requiredValidation, emailValidation } from 'utils/formValidations';
import { login } from 'services/userService';

import styles from './styles.module.scss';

interface LoginValues {
  email: string;
  password: string;
}

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
    onSuccess: response => {
      console.log(response);
      history.push(ROUTES.home);
    },
    onError: (err: Error) => {
      const errorMessage = err.status === 401 ? 'Login:invalidCredentials' : 'common:submitError';
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
              label={t('common:email')}
              name="email"
              error={errors.email?.message}
              inputRef={register(emailValidation(t))}
            />
            <Input
              label={t('common:password')}
              name="password"
              type="password"
              error={errors.password?.message}
              inputRef={register(requiredValidation(t))}
            />
            {isLoading ? (
              <Loading className="self-center" />
            ) : (
              <button className="btn" type="submit">
                {t('common:login')}
              </button>
            )}
            {error && <span className={`text-error ${styles.submitMessage}`}>{t(errorStatus)}</span>}
          </form>
          <Link className="btn secondary" to="/signup">
            {t('common:signup')}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
