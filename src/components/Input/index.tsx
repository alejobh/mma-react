import React, { Fragment } from 'react';

import styles from './styles.module.scss';

interface InputProps {
  name: string;
  inputRef?: any;
  error?: string;
  type?: string;
}

function Input({ error, name, inputRef, type }: InputProps) {
  return (
    <Fragment>
      <input className={styles.input} name={name} type={type} ref={inputRef} />
      {error && <p className={styles.errorMessage}>{error}</p>}
    </Fragment>
  );
}

export default Input;
