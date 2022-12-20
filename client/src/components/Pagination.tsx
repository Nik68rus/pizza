import React from 'react';
import classes from './Pagination.module.scss';

interface Props {
  count: number;
  current: number;
  onClick: (n: number) => void;
}

const Pagination = ({ count, current, onClick }: Props) => {
  return (
    <ul className={classes.pagination}>
      {new Array(count).fill(1).map((item, i) => (
        <li key={i}>
          <button
            className={current === i + 1 ? classes.active : ''}
            onClick={onClick.bind(this, i + 1)}
          >
            {i + 1}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Pagination;
