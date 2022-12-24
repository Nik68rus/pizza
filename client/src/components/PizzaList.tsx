import { useCallback, useEffect, useRef } from 'react';
import { PIZZA_MIN_WIDTH } from '../helpers/constants';
import { useAppDispatch, useAppSelector } from '../hooks/store';
import { setLimit } from '../store/slices/pageSlice';
import { fetchPizzas } from '../store/slices/pizzaSlice';
import PizzaItem from './PizzaItem';
import PizzaSkeleton from './skeletons/PizzaSkeleton';

const PizzaList = () => {
  const gridRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  const { pizzas, pizzaLoading } = useAppSelector((state) => state.pizza);
  const { sorting, category, searchTerm } = useAppSelector(
    (state) => state.filter
  );
  const currentPage = useAppSelector((state) => state.page.currentPage);
  const limit = useAppSelector((state) => state.page.limit);

  const handleFetch = useCallback(() => {
    dispatch(
      fetchPizzas({
        categoryId: category.id,
        sortingProperty: sorting?.property || 'rating',
        sortingOrder: sorting?.order || 'asc',
        searchTerm: searchTerm.trim(),
        page: currentPage,
        limit: limit || 6,
      })
    );
  }, [
    limit,
    category.id,
    sorting.order,
    sorting.property,
    searchTerm,
    currentPage,
    dispatch,
  ]);

  useEffect(() => {
    if (gridRef.current) {
      dispatch(
        setLimit(Math.floor(gridRef.current.clientWidth / PIZZA_MIN_WIDTH) * 2)
      );
    }
  }, [dispatch]);

  useEffect(() => {
    if (limit > 0) {
      handleFetch();
    }

    // window.scrollTo(0, 0);
  }, [limit, handleFetch]);

  if (pizzaLoading === 'failed') {
    return (
      <div className="content__error">
        <h2>
          Что-то пошло не так <i>😕</i>
        </h2>
        <p>
          Произошла ошибка при загрузке пицц с сервера! Повторите попытку позже!
        </p>

        <button className="button button--black" onClick={handleFetch}>
          Повторить
        </button>
      </div>
    );
  }

  return (
    <>
      <h2 className="content__title">{category.title} пиццы</h2>
      <div className="content__items" ref={gridRef}>
        {pizzaLoading === 'loading' ? (
          new Array(limit)
            .fill(null)
            .map((item, i) => <PizzaSkeleton key={i} />)
        ) : pizzas.length ? (
          pizzas.map((pizza) => <PizzaItem key={pizza.id} {...pizza} />)
        ) : (
          <h2>По вашему запросу ничего не найдено</h2>
        )}
      </div>
    </>
  );
};

export default PizzaList;
