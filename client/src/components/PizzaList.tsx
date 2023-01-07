import { useCallback, useEffect, useRef } from 'react';
import { PIZZA_MIN_WIDTH } from '../helpers/constants';
import { useAppDispatch, useAppSelector } from '../hooks/store';
import { selectFilterData } from '../store/slices/filterSlice';
import { selectPageData, setLimit } from '../store/slices/pageSlice';
import { fetchPizzas, selectPizzaData } from '../store/slices/pizzaSlice';
import { PizzaItem, PizzaSkeleton } from '.';

const PizzaList = () => {
  const gridRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  const { pizzas, pizzaLoading } = useAppSelector(selectPizzaData);
  const { sorting, category, searchTerm } = useAppSelector(selectFilterData);
  const { currentPage, limit } = useAppSelector(selectPageData);

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
