import { useState, useEffect, useRef } from 'react';

import Categories from '../components/Categories';
import PizzaItem from '../components/PizzaItem';
import { ALL_CAT, ICategory, IPizza, ISorting } from '../types';
import Select from '../components/Select';
import { getPizzas } from '../http/pizzaAPI';
import { handleError } from '../helpers/error-handler';
import PizzaSkeleton from '../components/skeletons/PizzaSkeleton';
import Search from '../components/Search';
import Pagination from '../components/Pagination';

const sortings: ISorting[] = [
  { id: 0, title: 'популярности ⬇️', property: 'rating', order: 'asc' },
  { id: 1, title: 'популярности ⬆️', property: 'rating', order: 'desc' },
  { id: 2, title: 'цене ⬇️', property: 'price', order: 'asc' },
  { id: 3, title: 'цене ⬆️', property: 'price', order: 'desc' },
  { id: 4, title: 'алфавиту ⬇️', property: 'title', order: 'asc' },
  { id: 5, title: 'алфавиту ⬆️', property: 'title', order: 'desc' },
];

const pizzaMinWidth = 300;

const Home = () => {
  const [sorting, setSorting] = useState<null | ISorting>(null);
  const [category, setCategory] = useState<ICategory>(ALL_CAT);
  const [items, setItems] = useState<IPizza[]>([]);
  const [pizzaLoading, setPizzaLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState<null | number>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (gridRef.current) {
      setLimit(Math.floor(gridRef.current.clientWidth / pizzaMinWidth) * 2);
    }
  }, [gridRef]);

  useEffect(() => {
    const getData = async () => {
      try {
        setPizzaLoading(true);
        const pizzas = await getPizzas(
          category.id,
          sorting?.property || 'rating',
          sorting?.order || 'asc',
          searchTerm.trim(),
          currentPage,
          limit || 6
        );
        setItems(pizzas.rows);
        setTotal(pizzas.count);
      } catch (err) {
        handleError(err);
      } finally {
        setPizzaLoading(false);
      }
    };

    if (limit) {
      getData();
    }

    // window.scrollTo(0, 0);
  }, [category, sorting, searchTerm, gridRef, limit, currentPage]);

  const pagesCount = Math.ceil(total / (limit || 6));

  return (
    <div className="content">
      <div className="container">
        <Search
          value={searchTerm}
          changeHandler={(value) => {
            setCurrentPage(1);
            setSearchTerm(value);
          }}
        />
        <div className="content__top">
          <Categories
            onSelect={(cat) => {
              setCategory(cat);
              setCurrentPage(1);
            }}
          />
          <Select
            label="Сортировка по:"
            items={sortings}
            onSelect={(item) => setSorting(item)}
          />
        </div>
        <h2 className="content__title">{category.title} пиццы</h2>
        <div className="content__items" ref={gridRef}>
          {pizzaLoading ? (
            new Array(limit)
              .fill(null)
              .map((item, i) => <PizzaSkeleton key={i} />)
          ) : items.length ? (
            items.map((pizza) => <PizzaItem key={pizza.id} {...pizza} />)
          ) : (
            <h2>По вашему запросу ничего не найдено</h2>
          )}
        </div>
        {pagesCount > 1 ? (
          <Pagination
            count={pagesCount}
            current={currentPage}
            onClick={(i: number) => setCurrentPage(i)}
          />
        ) : null}
      </div>
    </div>
  );
};

export default Home;
