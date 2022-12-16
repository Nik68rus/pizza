import { useState } from 'react';

const categories = [
  'Все',
  'Мясные',
  'Вегетарианская',
  'Гриль',
  'Острые',
  'Закрытые',
];

const Categories = () => {
  const [active, setActive] = useState(0);

  return (
    <div className="categories">
      <ul>
        {categories.map((cat, i) => (
          <li key={i}>
            <button
              className={active === i ? 'active' : ''}
              onClick={() => setActive(i)}
            >
              {cat}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
