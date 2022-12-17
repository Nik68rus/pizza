import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { RoutePath } from '../types/routes';

const Auth = () => {
  const location = useLocation();
  const isLogin = location.pathname === RoutePath.LOGIN;

  return (
    <div className="content">
      <div className="container">
        <h2 className="content__title">
          {isLogin ? 'Авторизация' : 'Регистрация'}
        </h2>
        <form>
          <div className="form">
            <div className="form__control">
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Введите e-mail"
              />
            </div>
            <div className="form__control">
              <label htmlFor="password">Пароль</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Введите пароль"
              />
            </div>
            {!isLogin && (
              <div className="form__control">
                <label htmlFor="password2">Повторите пароль</label>
                <input
                  type="password2"
                  id="password2"
                  name="password2"
                  placeholder="Повторите пароль"
                />
              </div>
            )}
            <div className="form__actions">
              {isLogin ? (
                <>
                  <Link to={RoutePath.SIGNUP}>Зарегистрироваться</Link>
                  <button type="submit" className="button">
                    Войти
                  </button>
                </>
              ) : (
                <>
                  <Link to={RoutePath.LOGIN}>Войти</Link>
                  <button type="submit" className="button">
                    Зарегистрироваться
                  </button>
                </>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Auth;
