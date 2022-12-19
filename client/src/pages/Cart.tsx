import React from 'react';
import {
  FaCartPlus,
  FaTrashAlt,
  FaTimes,
  FaArrowLeft,
  FaPlus,
  FaMinus,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { RoutePath } from '../types/routes';

const Cart = () => {
  return (
    <div className="content">
      <div className="container container--cart">
        <div className="cart">
          <div className="cart__top">
            <h2 className="content__title">
              <FaCartPlus /> Корзина
            </h2>
            <button className="cart__clear">
              <FaTrashAlt />
              <span>Очистить корзину</span>
            </button>
          </div>
          <div className="content__items">
            <div className="cart__item">
              <div className="cart__item-img">
                <img
                  className="pizza-block__image"
                  src="https://dodopizza-a.akamaihd.net/static/Img/Products/Pizza/ru-RU/b750f576-4a83-48e6-a283-5a8efb68c35d.jpg"
                  alt="Pizza"
                />
              </div>
              <div className="cart__item-info">
                <h3>Сырный цыпленок</h3>
                <p>тонкое тесто, 26 см.</p>
              </div>
              <div className="cart__item-count">
                <button className="button button--outline button--circle cart__item-count-minus">
                  <FaMinus />
                </button>
                <b>2</b>
                <button className="button button--outline button--circle cart__item-count-plus">
                  <FaPlus />
                </button>
              </div>
              <div className="cart__item-price">
                <b>770 ₽</b>
              </div>
              <div className="cart__item-remove">
                <button className="button button--outline button--circle">
                  <FaTimes />
                </button>
              </div>
            </div>
            <div className="cart__item">
              <div className="cart__item-img">
                <img
                  className="pizza-block__image"
                  src="https://dodopizza-a.akamaihd.net/static/Img/Products/Pizza/ru-RU/b750f576-4a83-48e6-a283-5a8efb68c35d.jpg"
                  alt="Pizza"
                />
              </div>
              <div className="cart__item-info">
                <h3>Сырный цыпленок</h3>
                <p>тонкое тесто, 26 см.</p>
              </div>
              <div className="cart__item-count">
                <button className="button button--outline button--circle cart__item-count-minus">
                  <FaMinus />
                </button>
                <b>2</b>
                <button className="button button--outline button--circle cart__item-count-plus">
                  <FaPlus />
                </button>
              </div>
              <div className="cart__item-price">
                <b>770 ₽</b>
              </div>
              <div className="cart__item-remove">
                <button className="button button--outline button--circle">
                  <FaTimes />
                </button>
              </div>
            </div>
            <div className="cart__item">
              <div className="cart__item-img">
                <img
                  className="pizza-block__image"
                  src="https://dodopizza-a.akamaihd.net/static/Img/Products/Pizza/ru-RU/b750f576-4a83-48e6-a283-5a8efb68c35d.jpg"
                  alt="Pizza"
                />
              </div>
              <div className="cart__item-info">
                <h3>Сырный цыпленок</h3>
                <p>тонкое тесто, 26 см.</p>
              </div>
              <div className="cart__item-count">
                <button className="button button--outline button--circle cart__item-count-minus">
                  <FaMinus />
                </button>
                <b>2</b>
                <button className="button button--outline button--circle cart__item-count-plus">
                  <FaPlus />
                </button>
              </div>
              <div className="cart__item-price">
                <b>770 ₽</b>
              </div>
              <div className="cart__item-remove">
                <button className="button button--outline button--circle">
                  <FaTimes />
                </button>
              </div>
            </div>
            <div className="cart__item">
              <div className="cart__item-img">
                <img
                  className="pizza-block__image"
                  src="https://dodopizza-a.akamaihd.net/static/Img/Products/Pizza/ru-RU/b750f576-4a83-48e6-a283-5a8efb68c35d.jpg"
                  alt="Pizza"
                />
              </div>
              <div className="cart__item-info">
                <h3>Сырный цыпленок</h3>
                <p>тонкое тесто, 26 см.</p>
              </div>
              <div className="cart__item-count">
                <button className="button button--outline button--circle cart__item-count-minus">
                  <FaMinus />
                </button>
                <b>2</b>
                <button className="button button--outline button--circle cart__item-count-plus">
                  <FaPlus />
                </button>
              </div>
              <div className="cart__item-price">
                <b>770 ₽</b>
              </div>
              <div className="cart__item-remove">
                <button className="button button--outline button--circle">
                  <FaTimes />
                </button>
              </div>
            </div>
            <div className="cart__item">
              <div className="cart__item-img">
                <img
                  className="pizza-block__image"
                  src="https://dodopizza-a.akamaihd.net/static/Img/Products/Pizza/ru-RU/b750f576-4a83-48e6-a283-5a8efb68c35d.jpg"
                  alt="Pizza"
                />
              </div>
              <div className="cart__item-info">
                <h3>Сырный цыпленок</h3>
                <p>тонкое тесто, 26 см.</p>
              </div>
              <div className="cart__item-count">
                <button className="button button--outline button--circle cart__item-count-minus">
                  <FaMinus />
                </button>
                <b>2</b>
                <button className="button button--outline button--circle cart__item-count-plus">
                  <FaPlus />
                </button>
              </div>
              <div className="cart__item-price">
                <b>770 ₽</b>
              </div>
              <div className="cart__item-remove">
                <button className="button button--outline button--circle">
                  <FaTimes />
                </button>
              </div>
            </div>
            <div className="cart__item">
              <div className="cart__item-img">
                <img
                  className="pizza-block__image"
                  src="https://dodopizza-a.akamaihd.net/static/Img/Products/Pizza/ru-RU/b750f576-4a83-48e6-a283-5a8efb68c35d.jpg"
                  alt="Pizza"
                />
              </div>
              <div className="cart__item-info">
                <h3>Сырный цыпленок</h3>
                <p>тонкое тесто, 26 см.</p>
              </div>
              <div className="cart__item-count">
                <button className="button button--outline button--circle cart__item-count-minus">
                  <FaMinus />
                </button>
                <b>2</b>
                <button className="button button--outline button--circle cart__item-count-plus">
                  <FaPlus />
                </button>
              </div>
              <div className="cart__item-price">
                <b>770 ₽</b>
              </div>
              <div className="cart__item-remove">
                <button className="button button--outline button--circle">
                  <FaTimes />
                </button>
              </div>
            </div>
            <div className="cart__item">
              <div className="cart__item-img">
                <img
                  className="pizza-block__image"
                  src="https://dodopizza-a.akamaihd.net/static/Img/Products/Pizza/ru-RU/b750f576-4a83-48e6-a283-5a8efb68c35d.jpg"
                  alt="Pizza"
                />
              </div>
              <div className="cart__item-info">
                <h3>Сырный цыпленок</h3>
                <p>тонкое тесто, 26 см.</p>
              </div>
              <div className="cart__item-count">
                <button className="button button--outline button--circle cart__item-count-minus">
                  <FaMinus />
                </button>
                <b>2</b>
                <button className="button button--outline button--circle cart__item-count-plus">
                  <FaPlus />
                </button>
              </div>
              <div className="cart__item-price">
                <b>770 ₽</b>
              </div>
              <div className="cart__item-remove">
                <button className="button button--outline button--circle">
                  <FaTimes />
                </button>
              </div>
            </div>
            <div className="cart__item">
              <div className="cart__item-img">
                <img
                  className="pizza-block__image"
                  src="https://dodopizza-a.akamaihd.net/static/Img/Products/Pizza/ru-RU/b750f576-4a83-48e6-a283-5a8efb68c35d.jpg"
                  alt="Pizza"
                />
              </div>
              <div className="cart__item-info">
                <h3>Сырный цыпленок</h3>
                <p>тонкое тесто, 26 см.</p>
              </div>
              <div className="cart__item-count">
                <button className="button button--outline button--circle cart__item-count-minus">
                  <FaMinus />
                </button>
                <b>2</b>
                <button className="button button--outline button--circle cart__item-count-plus">
                  <FaPlus />
                </button>
              </div>
              <div className="cart__item-price">
                <b>770 ₽</b>
              </div>
              <div className="cart__item-remove">
                <button className="button button--outline button--circle">
                  <FaTimes />
                </button>
              </div>
            </div>
            <div className="cart__item">
              <div className="cart__item-img">
                <img
                  className="pizza-block__image"
                  src="https://dodopizza-a.akamaihd.net/static/Img/Products/Pizza/ru-RU/b750f576-4a83-48e6-a283-5a8efb68c35d.jpg"
                  alt="Pizza"
                />
              </div>
              <div className="cart__item-info">
                <h3>Сырный цыпленок</h3>
                <p>тонкое тесто, 26 см.</p>
              </div>
              <div className="cart__item-count">
                <button className="button button--outline button--circle cart__item-count-minus">
                  <FaMinus />
                </button>
                <b>2</b>
                <button className="button button--outline button--circle cart__item-count-plus">
                  <FaPlus />
                </button>
              </div>
              <div className="cart__item-price">
                <b>770 ₽</b>
              </div>
              <div className="cart__item-remove">
                <button className="button button--outline button--circle">
                  <FaTimes />
                </button>
              </div>
            </div>
          </div>
          <div className="cart__bottom">
            <div className="cart__bottom-details">
              <span>
                Всего пицц: <b>3 шт.</b>
              </span>
              <span>
                Сумма заказа: <b>900 ₽</b>
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
