import { useState } from 'react';
import { FilterType } from '../types';

const Categories = () => {
  const [active, setActive] = useState(FilterType.ALL);

  return (
    <div className="categories">
      <ul>
        {Object.values(FilterType).map((cat) => (
          <li key={cat}>
            <button
              className={active === cat ? 'active' : ''}
              onClick={() => setActive(cat)}
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
