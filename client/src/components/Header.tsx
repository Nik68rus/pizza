import React, { useEffect, useRef } from 'react';
import logoSvg from '../assets/img/pizza-logo.svg';
import { CartIcon } from '.';
import { Link } from 'react-router-dom';
import { RoutePath } from '../types/routes';
import { useAppDispatch, useAppSelector } from '../hooks/store';
import { selectCartData, setCart } from '../store/slices/cartSlice';
import { logoutUser } from '../http/userAPI';

const Header = () => {
  const { items, totalPrice, totalQty } = useAppSelector(selectCartData);
  const isMounted = useRef(false);
  const dispatch = useAppDispatch();

  const logOutHandler = async () => {
    const result = await logoutUser();
    console.log(result);
  };

  useEffect(() => {
    if (isMounted.current) {
      const lsCart = {
        items,
        totalPrice,
        totalQty,
      };
      const cartString = JSON.stringify(lsCart);
      localStorage.setItem('cart', cartString);
    } else {
      const cart = JSON.parse(localStorage.getItem('cart') || '');
      dispatch(setCart(cart));

      isMounted.current = true;
    }
  }, [items, totalPrice, totalQty, dispatch]);

  return (
    <div className="header">
      <div className="container">
        <Link to={RoutePath.HOME}>
          <div className="header__logo">
            <img width="38" src={logoSvg} alt="Pizza logo" />
            <div>
              <h1>React Pizza</h1>
              <p>самая вкусная пицца во вселенной</p>
            </div>
          </div>
        </Link>
        <div className="header__controls">
          <Link to={RoutePath.ADMIN} className="button">
            Администрирование
          </Link>
          <Link to={RoutePath.LOGIN} className="button">
            Войти
          </Link>
          <button className="button" onClick={logOutHandler}>
            Выйти
          </button>
          <div className="header__cart">
            <Link to={RoutePath.CART} className="button button--cart">
              <span>{totalPrice} ₽</span>
              <div className="button__delimiter"></div>
              <CartIcon />
              <span>{totalQty}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
