import React from 'react';
import i18next from 'i18next';
import { useForm } from 'react-hook-form';

import logo from 'assets/logo.png';

import styles from './styles.module.scss';

type SignUpValues = {
  name: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
};

function Signup() {
  const { register, handleSubmit } = useForm<SignUpValues>();

  const onSubmit = (data: SignUpValues) => {
    console.log({
      email: data.email,
      password: data.password,
      password_confirmation: data.passwordConfirmation,
      first_name: data.name,
      last_name: data.lastName,
      locale: 'en'
    });
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
              {i18next.t('common:signup')}
            </button>
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
