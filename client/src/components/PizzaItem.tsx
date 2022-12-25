import { useState, useCallback } from 'react';
import { FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/store';
import { addItem, selectCartitem } from '../store/slices/cartSlice';
import { IPizza } from '../types';
import { RoutePath } from '../types/routes';

const PizzaItem = ({ id, title, price, imageUrl, bases, sizes }: IPizza) => {
  const [activeBase, setActiveBase] = useState(bases[0]);
  const [activeSize, setActiveSize] = useState(sizes[0]);

  const cartItemId = `${id}-${activeBase}-${activeSize}`;

  const dispatch = useAppDispatch();
  const cartItem = useAppSelector(selectCartitem(cartItemId));

  const getCurrentPrice = useCallback(() => {
    if (activeSize === 30) {
      return Math.round(price * 1.2);
    } else if (activeSize === 40) {
      return Math.round(price * 1.5);
    } else {
      return price;
    }
  }, [price, activeSize]);

  const clickHandler = () => {
    dispatch(
      addItem({
        id: cartItemId,
        imageUrl,
        title,
        base: activeBase,
        size: activeSize,
        price: getCurrentPrice(),
      })
    );
  };

  return (
    <div className="pizza-block">
      <Link to={`${RoutePath.DETAILS}/${id}`}>
        <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
        <h4 className="pizza-block__title">{title}</h4>
      </Link>
      <div className="pizza-block__selector">
        <ul>
          {bases.map((base) => (
            <li
              key={base}
              className={activeBase === base ? 'active' : ''}
              onClick={() => setActiveBase(base)}
            >
              {base}
            </li>
          ))}
        </ul>
        <ul>
          {sizes.map((size) => (
            <li
              className={activeSize === size ? 'active' : ''}
              key={size}
              onClick={() => setActiveSize(size)}
            >
              {size} см.
            </li>
          ))}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">{getCurrentPrice()} ₽</div>
        <button
          className="button button--outline button--add"
          onClick={clickHandler}
        >
          <FaPlus />
          <span>Добавить</span>
          {cartItem ? <i>{cartItem.qty}</i> : null}
        </button>
      </div>
    </div>
  );
};

export default PizzaItem;
