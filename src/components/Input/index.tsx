import React, { Fragment, Ref } from 'react';

import styles from './styles.module.scss';

interface InputProps {
  name: string;
  label: string;
  error?: string;
  inputRef?: Ref<HTMLInputElement>;
  type?: string;
}

function Input({ error, label, name, inputRef, type }: InputProps) {
  return (
    <Fragment>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      <input className={styles.input} name={name} type={type} ref={inputRef} />
      {error && <p className={styles.errorMessage}>{error}</p>}
    </Fragment>
  );
}

export default Input;
