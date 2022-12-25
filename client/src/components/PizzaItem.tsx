import { useState } from 'react';
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

  const clickHandler = () => {
    dispatch(
      addItem({
        id: cartItemId,
        imageUrl,
        title,
        base: activeBase,
        size: activeSize,
        price,
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
        <div className="pizza-block__price">от {price} ₽</div>
        <button
          className="button button--outline button--add"
          onClick={clickHandler}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Добавить</span>
          {cartItem ? <i>{cartItem.qty}</i> : null}
        </button>
      </div>
    </div>
  );
};

export default PizzaItem;
