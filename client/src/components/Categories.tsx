import { useState, useEffect } from 'react';
import { handleError } from '../helpers/error-handler';
import { getCategories } from '../http/categoryAPI';
import { ICategory } from '../types';

const allCat: ICategory = {
  title: 'Все',
  id: 0,
};

const Categories = () => {
  const [categories, setCategories] = useState<ICategory[]>([allCat]);
  const [active, setActive] = useState<ICategory>(allCat);

  useEffect(() => {
    const getData = async () => {
      try {
        const fetchedCategories = await getCategories();
        setCategories([allCat, ...fetchedCategories]);
      } catch (error) {
        handleError(error);
      }
    };
    getData();
  }, []);

  return (
    <div className="categories">
      <ul>
        {categories.map((cat) => (
          <li key={cat.id}>
            <button
              className={active.id === cat.id ? 'active' : ''}
              onClick={() => setActive(cat)}
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
