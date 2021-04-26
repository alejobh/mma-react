import React, { useState } from 'react';
import i18next from 'i18next';
import { useForm } from 'react-hook-form';

import logo from 'assets/logo.png';
import { useLazyRequest } from 'hooks/useRequest';
import { SignUpValues } from 'utils/types';
import { signUp } from 'services/userService';

import styles from './styles.module.scss';

function Signup() {
  const [submitError, setSubmitError] = useState(false);
  const { register, handleSubmit } = useForm<SignUpValues>();

  const withPostSuccess = (response: any) => {
    console.log(response);
  };

  const withPostFailure = () => {
    setSubmitError(true);
  };

  const [, submitting, , signUpCallback] = useLazyRequest({
    request: signUp,
    withPostSuccess,
    withPostFailure
  });

  const onSubmit = (formData: SignUpValues) => {
    setSubmitError(false);
    const payload = {
      email: formData.email,
      password: formData.password,
      password_confirmation: formData.passwordConfirmation,
      first_name: formData.name,
      last_name: formData.lastName,
      locale: 'en'
    };
    signUpCallback(payload);
  };

  return (
    <div className="column center full-width">
      <div className={`column center full-width ${styles.container}`}>
        <img src={logo} alt="Wolox logo" />
        <div className={`column center full-width ${styles.containerForm}`}>
          <form className={`column full-width ${styles.form}`} onSubmit={handleSubmit(onSubmit)}>
            <p>{i18next.t('Signup:name')}</p>
            <input name="name" ref={register} />
            <p>{i18next.t('Signup:lastName')}</p>
            <input name="lastName" ref={register} />
            <p>{i18next.t('common:email')}</p>
            <input name="email" ref={register} />
            <p>{i18next.t('common:password')}</p>
            <input name="password" type="password" ref={register} />
            <p>{i18next.t('Signup:passwordConfirmation')}</p>
            <input name="passwordConfirmation" type="password" ref={register} />
            <button className="btn" type="submit">
              {submitting ? 'Espere...' : i18next.t('common:signup')}
            </button>
            {submitError &&
              <span className={`text-error ${styles.submitError}`}>{i18next.t('Signup:submitError')}</span>
            }
          </form>
          <button className="btn secondary" type="button">
            {i18next.t('common:login')}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Signup;
