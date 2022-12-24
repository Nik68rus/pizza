import { useEffect } from 'react';
import qs from 'qs';
import Categories from '../components/Categories';
import Search from '../components/Search';
import Pagination from '../components/Pagination';
import PizzaList from '../components/PizzaList';
import Sorting from '../components/Sorting';
import { useAppDispatch, useAppSelector } from '../hooks/store';
import { setCategory, setSorting } from '../store/slices/filterSlice';
import { ALL_CAT, SORTINGS } from '../helpers/constants';
import { setCurrentPage, setLimit } from '../store/slices/pageSlice';

interface QueryParams {
  categoryId?: string;
  sorting?: string;
  order?: string;
  limit?: number;
  page?: number;
}

const Home = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.pizza.categories);

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
    } else {
      dispatch(setCategory(ALL_CAT));
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
