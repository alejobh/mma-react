import React from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useHistory } from 'react-router-dom';

import logo from 'assets/logo.png';
import Input from 'components/Input';
import Loading from 'components/Spinner/components/loading';
import {
  requiredValidation,
  emailValidation,
  passwordValidation,
  passwordConfirmationValidation
} from 'utils/formValidations';
import { signUp } from 'services/userService';

import styles from './styles.module.scss';

export interface SignUpValues {
  email: string;
  firstName: string;
  lastName: string;
  locale: string;
  password: string;
  passwordConfirmation: string;
}

function Signup() {
  const { t } = useTranslation();
  const history = useHistory();

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch
  } = useForm<SignUpValues>();

  const { error, isLoading, mutate, reset } = useMutation((data: SignUpValues) => signUp(data), {
    onSuccess: () => {
      reset();
      history.push('/login');
    }
  });

  const onSubmit = handleSubmit(formData => {
    mutate({ ...formData, locale: 'en' });
  });

  return (
    <div className="column center full-width">
      <div className={`column center full-width ${styles.container}`}>
        <img className={styles.logo} src={logo} alt="Wolox logo" />
        <div className={`column center full-width ${styles.containerForm}`}>
          <form className={`column full-width ${styles.form}`} onSubmit={onSubmit}>
            <Input
              label={t('Signup:firstName')}
              name="firstName"
              error={errors.firstName?.message}
              inputRef={register(requiredValidation(t))}
            />
            <Input
              label={t('Signup:lastName')}
              name="lastName"
              error={errors.lastName?.message}
              inputRef={register(requiredValidation(t))}
            />
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
              inputRef={register(passwordValidation(t))}
            />
            <Input
              label={t('Signup:passwordConfirmation')}
              name="passwordConfirmation"
              type="password"
              error={errors.passwordConfirmation?.message}
              inputRef={register(passwordConfirmationValidation(t, watch('password')))}
            />
            {isLoading ? (
              <Loading className="self-center" />
            ) : (
              <button className="btn" type="submit">
                {t('common:signup')}
              </button>
            )}
            {error && <span className={`text-error ${styles.submitMessage}`}>{t('Signup:submitError')}</span>}
          </form>
          <button className="btn secondary" type="button">
            {t('common:login')}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Signup;
