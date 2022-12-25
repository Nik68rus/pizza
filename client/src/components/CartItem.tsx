import React from 'react';
import { FaMinus, FaPlus, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../hooks/store';
import { addItem, deletePosition, removeItem } from '../store/slices/cartSlice';
import { IInCartItem } from '../types';
import { RoutePath } from '../types/routes';

interface Props {
  item: IInCartItem;
}

const CartItem = ({ item }: Props) => {
  const dispatch = useAppDispatch();

  const removeHandler = () => {
    dispatch(deletePosition(item.id));
  };

  const incHandler = () => {
    dispatch(addItem(item));
  };

  const decHandler = () => {
    dispatch(removeItem(item.id));
  };

  return (
    <div className="cart__item">
      <div className="cart__item-img">
        <Link to={`${RoutePath.DETAILS}/${item.id.split('-')[0]}`}>
          <img
            className="pizza-block__image"
            src={item.imageUrl}
            alt={item.title}
          />
        </Link>
      </div>
      <div className="cart__item-info">
        <h3>{item.title}</h3>
        <p>
          {item.base} тесто, {item.size} см.
        </p>
      </div>
      <div className="cart__item-count">
        <button
          className="button button--outline button--circle cart__item-count-minus"
          aria-label="Убрать одну"
          onClick={decHandler}
        >
          <FaMinus />
        </button>
        <b>{item.qty}</b>
        <button
          className="button button--outline button--circle cart__item-count-plus"
          aria-label="Добавить одну"
          onClick={incHandler}
        >
          <FaPlus />
        </button>
      </div>
      <div className="cart__item-price">
        <b>{item.price * item.qty} ₽</b>
      </div>
      <div className="cart__item-remove">
        <button
          className="button button--outline button--circle"
          aria-label="Удалить строку"
          onClick={removeHandler}
        >
          <FaTimes />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
