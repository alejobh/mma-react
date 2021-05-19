import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router-dom';

import PATHS from 'constants/paths';
import { getBookDetail } from 'services/bookService';

import styles from './styles.module.scss';

interface RouteParam {
  id: string;
}

interface Details {
  author: string;
  editor: string;
  genre: string;
  id: number;
  imageUrl: string;
  title: string;
  year: number;
}

function BookDetail() {
  const [details, setDetails] = useState<Details>();
  const { t } = useTranslation();
  const history = useHistory();
  const { id } = useParams<RouteParam>();
  const { error, isLoading } = useQuery('book-detail', () => getBookDetail(id), {
    onSuccess: (response: Details) => {
      setDetails(response);
    }
  });

  const handleGoBack = () => {
    history.push(PATHS.home);
  };

  return (
    <div className={`column center full-width ${styles.container}`}>
      <div className={`full-width ${styles.content}`}>
        <button className={`row middle ${styles.returnButton}`} type="button" onClick={handleGoBack}>
          {t('Common:back')}
        </button>
        <div className={`row full-width ${styles.detailsContainer}`}>
          <img
            className={styles.cover}
            src={details?.imageUrl}
            alt={t('Home:bookCover', { title: details?.title })}
          />
          <div className="column full-width">
            <div className={`row middle ${styles.detailsHeader}`}>
              <p className={styles.title}>{details?.title}</p>
              <p className={styles.genre}>{`(${details?.genre})`}</p>
            </div>
            <div className={`column space-evenly ${styles.detailsSide}`}>
              <p className={styles.detailItem}>
                {t('BookDetail:author')}
                <span className={styles.info}>{details?.author}</span>
              </p>
              <p className={styles.detailItem}>
                {t('BookDetail:publisher')}
                <span className={styles.info}>{details?.editor}</span>
              </p>
              <p className={styles.detailItem}>
                {t('BookDetail:publishYear')}
                <span className={styles.info}>{details?.year}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookDetail;
