import React from 'react';
import i18next from 'i18next';
import { useQuery } from 'react-query';

import { getBookList } from 'services/bookService';

import styles from './styles.module.scss';

function Home() {
  const { error, isLoading, data } = useQuery('books', getBookList);

  return (
    <div className={styles.app}>
      <header className={styles.appHeader}>
        <p className={styles.text}>{i18next.t('Home:welcome')}</p>
      </header>
    </div>
  );
}

export default Home;
