import React from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/store';
import { setCurrentPage } from '../store/slices/pageSlice';
import classes from './Pagination.module.scss';

const Pagination = () => {
  const dispatch = useAppDispatch();
  const { totalPizzaCount, limit, currentPage } = useAppSelector(
    (state) => state.page
  );
  const pagesCount = Math.ceil(totalPizzaCount / (limit || 6));

  if (pagesCount === 1) return null;

  return (
    <ul className={classes.pagination}>
      {new Array(pagesCount).fill(1).map((item, i) => (
        <li key={i}>
          <button
            className={currentPage === i + 1 ? classes.active : ''}
            onClick={() => dispatch(setCurrentPage(i + 1))}
          >
            {i + 1}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Pagination;
