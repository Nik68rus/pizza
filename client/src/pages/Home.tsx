import { useEffect } from 'react';
import qs from 'qs';
import { useAppDispatch, useAppSelector } from '../hooks/store';
import { setCategory, setSorting } from '../store/slices/filterSlice';
import { SORTINGS } from '../helpers/constants';
import { setCurrentPage, setLimit } from '../store/slices/pageSlice';
import { selectCategories } from '../store/slices/pizzaSlice';
import {
  Categories,
  Search,
  Pagination,
  PizzaList,
  Sorting,
} from '../components';

interface QueryParams {
  categoryId?: string;
  sorting?: string;
  order?: string;
  limit?: number;
  page?: number;
}

const Home = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search, {
        ignoreQueryPrefix: true,
      }) as QueryParams;

      if (params.categoryId && !isNaN(+params.categoryId)) {
        const cat = categories.find(
          (category) => category.id === +params.categoryId!
        );

        if (cat) {
          dispatch(setCategory(cat));
        }
      }

      if (params.sorting && params.order) {
        const sorting = SORTINGS.find(
          (sort) =>
            sort.property === params.sorting && sort.order === params.order
        );

        if (sorting) {
          dispatch(setSorting(sorting));
        }
      }

      if (
        params.limit &&
        params.page &&
        !isNaN(params.limit) &&
        !isNaN(params.page)
      ) {
        dispatch(setLimit(+params.limit));
        dispatch(setCurrentPage(+params.page));
      }
    }
  }, [dispatch, categories]);

  return (
    <div className="content">
      <div className="container">
        <Search />
        <div className="content__top">
          <Categories />
          <Sorting />
        </div>
        <PizzaList />
        <Pagination />
      </div>
    </div>
  );
};

export default Home;
