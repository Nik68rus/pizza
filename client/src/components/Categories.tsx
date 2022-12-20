import { useState, useEffect } from 'react';
import { handleError } from '../helpers/error-handler';
import { getCategories } from '../http/categoryAPI';
import { ALL_CAT, ICategory } from '../types';
import CategorySkeleton from './skeletons/CategorySkeleton';

interface Props {
  onSelect: (cat: ICategory) => void;
}

const Categories = ({ onSelect }: Props) => {
  const [categories, setCategories] = useState<ICategory[]>([ALL_CAT]);
  const [active, setActive] = useState<ICategory>(ALL_CAT);
  const [loading, setLoading] = useState(true);

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
                  className={active.id === cat.id ? 'active' : ''}
                  onClick={() => {
                    setActive(cat);
                    onSelect(cat);
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
