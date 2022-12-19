import { useState, useEffect } from 'react';

import Categories from '../components/Categories';
import PizzaItem from '../components/PizzaItem';
import { IPizza } from '../types';
import Select from '../components/Select';
import { getPizzas } from '../http/pizzaAPI';
import { handleError } from '../helpers/error-handler';
import PizzaSkeleton from '../components/skeletons/PizzaSkeleton';

const sortings = [
  { id: 0, title: 'популярности' },
  { id: 1, title: 'цене' },
  { id: 2, title: 'алфавиту' },
];

const Home = () => {
  const [sorting, setSorting] = useState<null | number>(null);
  const [items, setItems] = useState<IPizza[]>([]);
  const [pizzaLoading, setPizzaLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        setPizzaLoading(true);
        const pizzas = await getPizzas();
        setItems(pizzas);
      } catch (err) {
        handleError(err);
      } finally {
        setPizzaLoading(false);
      }
    };
    getData();
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="content">
      <div className="container">
        <div className="content__top">
          <Categories />
          <Select
            label="Сортировка по:"
            items={sortings}
            onSelect={(id) => setSorting(id)}
          />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">
          {pizzaLoading
            ? new Array(8)
                .fill(null)
                .map((item, i) => <PizzaSkeleton key={i} />)
            : items.length &&
              items.map((pizza) => <PizzaItem key={pizza.id} {...pizza} />)}
        </div>
      </div>
    </div>
  );
};

export default Home;
