import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import { useHistory } from 'react-router-dom';

import defaultCover from 'assets/book-cover.png';
import PATHS from 'constants/paths';
import { getBookList } from 'services/bookService';

import styles from './styles.module.scss';

interface BookInfo {
  author: string;
  createdAt: string;
  editor: string;
  genre: string;
  id: number;
  imageUrl: string;
  title: string;
  updatedAt: string;
  year: string;
}

interface Books {
  count: number;
  currentPage: number;
  nextPage?: number;
  page: BookInfo[];
  totalCount: number;
  totalPages: number;
}

function Home() {
  const [books, setBooks] = useState<BookInfo[]>([]);
  const { t } = useTranslation();
  const history = useHistory();
  const { error, isLoading } = useQuery('books', getBookList, {
    onSuccess: (bookList: Books) => {
      setBooks(bookList.page);
    }
  });

  const onHandleBookSelection = (bookId: number) => {
    history.push(`${PATHS.home}/${bookId}`);
  };

  const renderBooks = () =>
    books.map(book => (
      <div
        key={book.title}
        onClick={() => onHandleBookSelection(book.id)}
        className={`column center space-between ${styles.bookContainer}`}
      >
        <img
          className={styles.bookCover}
          src={book.imageUrl || defaultCover}
          alt={t('Home:bookCover', { title: book.title })}
        />
        <div>
          <p className={styles.title}>{book.title}</p>
          <p>{book.author}</p>
        </div>
      </div>
    ));

  return (
    <div className={`row center full-width ${styles.container}`}>
      <div className={`row wrap ${styles.bookListContainer}`}>{renderBooks()}</div>
    </div>
  );
}

export default Home;
