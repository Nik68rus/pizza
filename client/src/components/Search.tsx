import { useState, useEffect, useRef } from 'react';
import classes from './Search.module.scss';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { setSearchTerm } from '../store/slices/filterSlice';
import { useAppDispatch } from '../hooks/store';

const Search = () => {
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  const clearHandler = () => {
    setValue('');
    dispatch(setSearchTerm(''));
    inputRef.current?.focus();
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setSearchTerm(value));
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [value, dispatch]);

  return (
    <div className={classes.search}>
      <form className="form">
        <div className="form__control form__control--search">
          <FaSearch className={classes.icon} />
          <input
            type="text"
            placeholder="Введите название"
            value={value}
            onChange={changeHandler}
            ref={inputRef}
          />
          <button
            type="reset"
            aria-label="Очистить поле"
            onClick={clearHandler}
          >
            <FaTimes />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Search;
