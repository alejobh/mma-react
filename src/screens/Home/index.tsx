import React, { useState } from 'react';
import i18next from 'i18next';
import { useQuery } from 'react-query';

import defaultCover from 'assets/book-cover.png';

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
  const { error, isLoading } = useQuery('books', getBookList, {
    onSuccess: (bookList: Books) => {
      setBooks(bookList.page);
    }
  });

  const renderBooks = () =>
    books.map(book => (
      <div key={book.title} className={`column center space-between ${styles.bookContainer}`}>
        <img className={styles.bookCover} src={book.imageUrl || defaultCover} alt={`Tapa ${book.title}`} />
        <div>
          <p>{book.title}</p>
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
