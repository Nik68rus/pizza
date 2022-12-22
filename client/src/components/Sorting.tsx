import { useCallback } from 'react';

import { SORTINGS } from '../helpers/constants';
import { useAppDispatch } from '../hooks/store';
import { setSorting } from '../store/slices/filterSlice';
import { ISorting } from '../types';
import Select from './Select';

const Sorting = () => {
  const dispatch = useAppDispatch();
  const sortClickHandler = useCallback(
    (item: ISorting) => dispatch(setSorting(item)),
    [dispatch]
  );

  return (
    <Select
      label="Сортировка по:"
      items={SORTINGS}
      onSelect={sortClickHandler}
    />
  );
};

export default Sorting;
