import React, { useState } from 'react';
import i18next from 'i18next';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';

import logo from 'assets/logo.png';
import { SignUpValues } from 'utils/types';
import { signUp } from 'services/userService';
import Button from 'components/Button';

import styles from './styles.module.scss';

function Signup() {
  const { register, handleSubmit } = useForm<SignUpValues>();
  const signupMutation = useMutation((data: SignUpValues) => signUp(data), {
    onSuccess: data => {
      console.log(data);
    }
  })

  const onSubmit = (formData: SignUpValues) => {
    signupMutation.reset();
    signupMutation.mutate({ ...formData, locale: 'en' });
  };

  return (
    <div className="column center full-width">
      <div className={`column center full-width ${styles.container}`}>
        <img src={logo} alt="Wolox logo" />
        <div className={`column center full-width ${styles.containerForm}`}>
          <form className={`column full-width ${styles.form}`} onSubmit={handleSubmit(onSubmit)}>
            <p>{i18next.t('Signup:firstName')}</p>
            <input name="firstName" ref={register} />
            <p>{i18next.t('Signup:lastName')}</p>
            <input name="lastName" ref={register} />
            <p>{i18next.t('common:email')}</p>
            <input name="email" ref={register} />
            <p>{i18next.t('common:password')}</p>
            <input name="password" type="password" ref={register} />
            <p>{i18next.t('Signup:passwordConfirmation')}</p>
            <input name="passwordConfirmation" type="password" ref={register} />
            <Button customClass="primary" loading={signupMutation.isLoading} type="submit">
              {i18next.t('common:signup')}
            </Button>
            {signupMutation.error &&
              <span className={`text-error ${styles.submitError}`}>{i18next.t('Signup:submitError')}</span>
            }
          </form>
          <Button customClass="secondary" loading={false} type="button">
            {i18next.t('common:login')}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Signup;
