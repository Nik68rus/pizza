import { useCallback, useEffect, useRef } from 'react';
import { PIZZA_MIN_WIDTH } from '../helpers/constants';
import { handleError } from '../helpers/error-handler';
import { useAppDispatch, useAppSelector } from '../hooks/store';
import { getPizzas } from '../http/pizzaAPI';
import { setLimit, setTotalPizzaCount } from '../store/slices/pageSlice';
import { setPizzaLoading, setPizzas } from '../store/slices/pizzaSlice';
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

  const getData = useCallback(async () => {
    try {
      dispatch(setPizzaLoading(true));
      const pizzas = await getPizzas(
        category.id,
        sorting?.property || 'rating',
        sorting?.order || 'asc',
        searchTerm.trim(),
        currentPage,
        limit || 6
      );
      dispatch(setPizzas(pizzas.rows));
      dispatch(setTotalPizzaCount(pizzas.count));
    } catch (err) {
      handleError(err);
    } finally {
      dispatch(setPizzaLoading(false));
    }
  }, [category, sorting, searchTerm, limit, currentPage, dispatch]);

  useEffect(() => {
    if (gridRef.current) {
      dispatch(
        setLimit(Math.floor(gridRef.current.clientWidth / PIZZA_MIN_WIDTH) * 2)
      );
    }
  }, [dispatch]);

  useEffect(() => {
    if (limit > 0) {
      getData();
    }

    // window.scrollTo(0, 0);
  }, [limit, getData]);

  return (
    <>
      <h2 className="content__title">{category.title} пиццы</h2>
      <div className="content__items" ref={gridRef}>
        {pizzaLoading ? (
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
