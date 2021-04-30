import React from 'react';
import { withSpinner } from 'components/Spinner';

import styles from './styles.module.scss';

interface ButtonProps {
  children: React.ReactNode;
  customClass: 'primary' | 'secondary';
  type: 'submit' | 'button';
  clickCallback?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  loading?: boolean;
}

function Button({ customClass, children, clickCallback, loading = false, type, ...props }: ButtonProps) {
  return (
    <button
      className={`${styles.btn} ${customClass === 'primary' ? styles.primary : styles.secondary}`}
      onClick={clickCallback}
      type={type || 'button'}
      {...props}
    >
      {children}
    </button>
  );
}

export default withSpinner({classNameContainer: styles.loader})(Button);
