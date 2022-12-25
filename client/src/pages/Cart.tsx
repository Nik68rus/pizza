import React from 'react';
import { FaCartPlus, FaTrashAlt, FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import CartItem from '../components/CartItem';
import EmptyCart from '../components/EmptyCart';
import { useAppDispatch, useAppSelector } from '../hooks/store';
import { resetCart, selectCartData } from '../store/slices/cartSlice';
import { RoutePath } from '../types/routes';

const Cart = () => {
  const dispatch = useAppDispatch();
  const { items, totalPrice, totalQty } = useAppSelector(selectCartData);

  const resetHandler = () => {
    dispatch(resetCart());
  };

  if (!totalQty) {
    return <EmptyCart />;
  }

  return (
    <div className="content">
      <div className="container container--cart">
        <div className="cart">
          <div className="cart__top">
            <h2 className="content__title">
              <FaCartPlus /> Корзина
            </h2>
            <button className="cart__clear" onClick={resetHandler}>
              <FaTrashAlt />
              <span>Очистить корзину</span>
            </button>
          </div>
          <div className="content__items">
            {items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
          <div className="cart__bottom">
            <div className="cart__bottom-details">
              <span>
                Всего пицц: <b>{totalQty} шт.</b>
              </span>
              <span>
                Сумма заказа: <b>{totalPrice} ₽</b>
              </span>
            </div>
            <div className="cart__bottom-buttons">
              <Link
                to={RoutePath.HOME}
                className="button button--outline button--add go-back-btn"
              >
                <FaArrowLeft />
                <span>Вернуться назад</span>
              </Link>
              <button className="button pay-btn">
                <span>Оплатить сейчас</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
