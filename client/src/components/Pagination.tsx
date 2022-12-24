import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/store';
import { setCurrentPage } from '../store/slices/pageSlice';
import classes from './Pagination.module.scss';

const Pagination = () => {
  const dispatch = useAppDispatch();
  const { limit, currentPage } = useAppSelector((state) => state.page);
  const totalCount = useAppSelector((state) => state.pizza.totalCount);
  const [searchParams, setSearchParams] = useSearchParams();
  const pagesCount = Math.ceil(totalCount / (limit || 6));

  const clickHandler = (i: number) => {
    dispatch(setCurrentPage(i + 1));
    if (i === 0) {
      searchParams.delete('page');
      searchParams.delete('limit');
    } else {
      searchParams.set('page', (i + 1).toString());
      searchParams.set('limit', limit.toString());
    }
    setSearchParams(searchParams);
  };

  if (pagesCount === 1) return null;

  return (
    <ul className={classes.pagination}>
      {new Array(pagesCount).fill(1).map((item, i) => (
        <li key={i}>
          <button
            className={currentPage === i + 1 ? classes.active : ''}
            onClick={clickHandler.bind(this, i)}
          >
            {i + 1}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Pagination;
