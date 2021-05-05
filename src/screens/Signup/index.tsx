import React from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';

import logo from 'assets/logo.png';
import Input from 'components/Input';
import Loading from 'components/Spinner/components/loading';
import {
  requiredValidation,
  emailValidation,
  passwordValidation,
  passwordConfirmationValidation
} from 'utils/formValidations';
import { SignUpValues } from 'utils/types';
import { signUp } from 'services/userService';

import styles from './styles.module.scss';

function Signup() {
  const { t } = useTranslation();

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch
  } = useForm<SignUpValues>();

  const signupMutation = useMutation((data: SignUpValues) => signUp(data), {
    onSuccess: data => {
      console.log(data);
    }
  });

  const onSubmit = handleSubmit(formData => {
    signupMutation.reset();
    signupMutation.mutate({ ...formData, locale: 'en' });
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
            {signupMutation.isLoading ? (
              <Loading className="self-center" />
            ) : (
              <button className="btn" type="submit">
                {t('common:signup')}
              </button>
            )}
            {signupMutation.error ? (
              <span className={`text-error ${styles.submitError}`}>{t('Signup:submitError')}</span>
            ) : (
              <span>{t('Signup:submitSuccess')}</span>
            )}
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
