import React from 'react';
import classes from './Search.module.scss';
import { FaSearch, FaTimes } from 'react-icons/fa';

interface Props {
  value: string;
  changeHandler: (value: string) => void;
}

const Search = ({ value, changeHandler }: Props) => {
  return (
    <div className={classes.search}>
      <form className="form">
        <div className="form__control form__control--search">
          <FaSearch className={classes.icon} />
          <input
            type="text"
            placeholder="Введите название"
            value={value}
            onChange={(e) => changeHandler(e.target.value)}
          />
          <button
            type="reset"
            aria-label="Очистить поле"
            onClick={() => changeHandler('')}
          >
            <FaTimes />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Search;
