import React from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';

import logo from 'assets/logo.png';
import Button from 'components/Button';
import Input from 'components/Input';
import { requiredValidation } from 'utils/formValidations';
import { SignUpValues } from 'utils/types';
import { signUp } from 'services/userService';

import styles from './styles.module.scss';

function Signup() {
  const { t } = useTranslation();

  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm<SignUpValues>();

  const signupMutation = useMutation((data: SignUpValues) => signUp(data), {
    onSuccess: data => {
      console.log(data);
    }
  });

  const onSubmit = (formData: SignUpValues) => {
    signupMutation.reset();
    signupMutation.mutate({ ...formData, locale: 'en' });
  };

  return (
    <div className="column center full-width">
      <div className={`column center full-width ${styles.container}`}>
        <img className={styles.logo} src={logo} alt="Wolox logo" />
        <div className={`column center full-width ${styles.containerForm}`}>
          <form className={`column full-width ${styles.form}`} onSubmit={handleSubmit(onSubmit)}>
            <Input
              label={t('Signup:name')}
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
              inputRef={register(requiredValidation(t))}
            />
            <Input
              label={t('common:password')}
              name="password"
              type="password"
              error={errors.password?.message}
              inputRef={register(requiredValidation(t))}
            />
            <Input
              label={t('Signup:passwordConfirmation')}
              name="passwordConfirmation"
              type="password"
              error={errors.passwordConfirmation?.message}
              inputRef={register(requiredValidation(t))}
            />
            <Button customClass="primary" loading={signupMutation.isLoading} type="submit">
              {t('common:signup')}
            </Button>
            {signupMutation.error && (
              <span className={`text-error ${styles.submitError}`}>{t('Signup:submitError')}</span>
            )}
          </form>
          <Button customClass="secondary" loading={false} type="button">
            {t('common:login')}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Signup;
