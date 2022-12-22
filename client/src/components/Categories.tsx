import { useState, useEffect } from 'react';
import { ALL_CAT } from '../helpers/constants';
import { handleError } from '../helpers/error-handler';
import { getCategories } from '../http/categoryAPI';
import { ICategory } from '../types';
import CategorySkeleton from './skeletons/CategorySkeleton';
import { useAppDispatch, useAppSelector } from '../hooks/store';
import { setCategory } from '../store/slices/filterSlice';
import { setCurrentPage } from '../store/slices/pageSlice';

const Categories = () => {
  const [categories, setCategories] = useState<ICategory[]>([ALL_CAT]);
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();
  const category = useAppSelector((state) => state.filter.category);

  useEffect(() => {
    const getData = async () => {
      try {
        const fetchedCategories = await getCategories();
        setCategories([ALL_CAT, ...fetchedCategories]);
      } catch (error) {
        handleError(error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

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
                  onClick={() => {
                    dispatch(setCategory(cat));
                    dispatch(setCurrentPage(1));
                  }}
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
