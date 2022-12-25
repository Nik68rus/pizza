import React from 'react';
import logoSvg from '../assets/img/pizza-logo.svg';
import CartIcon from './CartIcon';
import { Link } from 'react-router-dom';
import { RoutePath } from '../types/routes';
import { useAppSelector } from '../hooks/store';
import { selectCartData } from '../store/slices/cartSlice';

const Header = () => {
  const { totalPrice, totalQty } = useAppSelector(selectCartData);

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
