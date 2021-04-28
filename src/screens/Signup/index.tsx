import React from 'react';
import i18next from 'i18next';
import { useForm } from 'react-hook-form';

import logo from 'assets/logo.png';
import Input from 'components/Input';
import { requiredValidation } from 'utils/inputValidations';

import styles from './styles.module.scss';

interface SignUpValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

function Signup() {
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm<SignUpValues>();

  const onSubmit = (data: SignUpValues) => {
    console.log({
      email: data.email,
      password: data.password,
      password_confirmation: data.passwordConfirmation,
      first_name: data.firstName,
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
            <Input
              label={i18next.t('Signup:name')}
              name="firstName"
              error={errors.firstName?.message}
              inputRef={register(requiredValidation(i18next.t('common:requiredField')))}
            />
            <Input
              label={i18next.t('Signup:lastName')}
              name="lastName"
              error={errors.lastName?.message}
              inputRef={register(requiredValidation(i18next.t('common:requiredField')))}
            />
            <Input
              label={i18next.t('common:email')}
              name="email"
              error={errors.email?.message}
              inputRef={register(requiredValidation(i18next.t('common:requiredField')))}
            />
            <Input
              label={i18next.t('common:password')}
              name="password"
              type="password"
              error={errors.password?.message}
              inputRef={register(requiredValidation(i18next.t('common:requiredField')))}
            />
            <Input
              label={i18next.t('Signup:passwordConfirmation')}
              name="passwordConfirmation"
              type="password"
              error={errors.passwordConfirmation?.message}
              inputRef={register(requiredValidation(i18next.t('common:requiredField')))}
            />
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
