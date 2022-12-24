import { useState, useEffect } from 'react';
import { ALL_CAT } from '../helpers/constants';
import { handleError } from '../helpers/error-handler';
import { getCategories } from '../http/categoryAPI';
import CategorySkeleton from './skeletons/CategorySkeleton';
import { useAppDispatch, useAppSelector } from '../hooks/store';
import { setCategory } from '../store/slices/filterSlice';
import { setCurrentPage } from '../store/slices/pageSlice';
import { setCategories } from '../store/slices/pizzaSlice';
import { ICategory } from '../types';
import { useSearchParams } from 'react-router-dom';

const Categories = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();
  const category = useAppSelector((state) => state.filter.category);
  const categories = useAppSelector((state) => state.pizza.categories);

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const getData = async () => {
      try {
        const fetchedCategories = await getCategories();
        dispatch(setCategories([ALL_CAT, ...fetchedCategories]));
      } catch (error) {
        handleError(error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [dispatch]);

  const clickHandler = (cat: ICategory) => {
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
  };

  return (
    <div className="categories">
      <ul>
        {loading
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
    </div>
  );
};

export default Categories;
