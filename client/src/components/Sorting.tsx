import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

import { SORTINGS } from '../helpers/constants';
import { useAppDispatch, useAppSelector } from '../hooks/store';
import { setSorting } from '../store/slices/filterSlice';
import { ISorting } from '../types';
import Select from './Select';

const Sorting = () => {
  const dispatch = useAppDispatch();
  const sorting = useAppSelector((state) => state.filter.sorting);
  const [searchParams, setSearchParams] = useSearchParams();

  const sortClickHandler = useCallback(
    (item: ISorting) => {
      dispatch(setSorting(item));
      if (item.id === SORTINGS[0].id) {
        searchParams.delete('sorting');
        searchParams.delete('order');
      } else {
        searchParams.set('sorting', item.property);
        searchParams.set('order', item.order);
      }
      setSearchParams(searchParams);
    },
    [dispatch, searchParams, setSearchParams]
  );

  return (
    <Select
      label="Сортировка по:"
      items={SORTINGS}
      onSelect={sortClickHandler}
      selected={sorting}
    />
  );
};

export default Sorting;
