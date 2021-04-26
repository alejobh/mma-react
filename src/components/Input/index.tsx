import React, { Fragment } from 'react';

import styles from './styles.module.scss';

interface InputProps {
  name: string;
  register: any;
  error?: string;
  type?: string;
}

function Input({ error, name, register, type }: InputProps) {
  return (
    <Fragment>
      <input className={styles.input} name={name} type={type} ref={register} />
      {error && <p className={styles.errorMessage}>{error}</p>}
    </Fragment>
  );
}

export default Input;
