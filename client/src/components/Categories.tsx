import React, { useEffect, useCallback } from 'react';
import { CategorySkeleton } from '.';
import { useAppDispatch, useAppSelector } from '../hooks/store';
import { selectCategory, setCategory } from '../store/slices/filterSlice';
import { setCurrentPage } from '../store/slices/pageSlice';
import { ICategory } from '../types';
import { useSearchParams } from 'react-router-dom';
import {
  fetchCategories,
  selectCategories,
  selectCatLoading,
} from '../store/slices/pizzaSlice';
import { handleError } from '../helpers/error-handler';

const Categories = React.memo(() => {
  const dispatch = useAppDispatch();
  const category = useAppSelector(selectCategory);
  const categories = useAppSelector(selectCategories);
  const catLoading = useAppSelector(selectCatLoading);

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (catLoading === 'failed') {
      handleError(
        'При попытке загрузить категории произошла ошибка. Повторите запрос позднее'
      );
    }
  }, [catLoading]);

  const clickHandler = useCallback(
    (cat: ICategory) => {
      dispatch(setCategory(cat));
      dispatch(setCurrentPage(1));

      searchParams.delete('limit');
      searchParams.delete('page');
      if (cat.id !== 0) {
        searchParams.set('categoryId', cat.id.toString());
      } else {
        searchParams.delete('categoryId');
      }
      setSearchParams(searchParams);
    },
    [dispatch, setSearchParams, searchParams]
  );

  return (
    <div className="categories">
      <ul>
        {catLoading === 'loading'
          ? new Array(6)
              .fill(null)
              .map((item, i) => <CategorySkeleton key={i} />)
          : categories.map((cat) => (
              <li key={cat.id}>
                <button
                  className={category.id === cat.id ? 'active' : ''}
                  onClick={clickHandler.bind(this, cat)}
                >
                  {cat.title}
                </button>
              </li>
            ))}
      </ul>
      {catLoading === 'failed' ? (
        <button className="button" onClick={() => dispatch(fetchCategories())}>
          Повторить
        </button>
      ) : null}
    </div>
  );
});

export default Categories;
