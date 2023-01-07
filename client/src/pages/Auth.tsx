import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import isEmail from 'validator/lib/isEmail';
import { handleError } from '../helpers/error-handler';
import { createUser } from '../http/userAPI';
import { RoutePath } from '../types/routes';
import { IUserData } from '../types/user';

const Auth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isLogin = location.pathname === RoutePath.LOGIN;
  const [isValid, setIsValid] = useState(false);
  const [formData, setFormData] = useState<IUserData>({
    email: '',
    name: '',
    password: '',
    password2: '',
  });

  const { email, name, password, password2 } = formData;

  const inputChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    const { value, name } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const signupSubmitHandler: React.FormEventHandler<HTMLFormElement> = async (
    e
  ) => {
    e.preventDefault();
    try {
      await createUser(formData);
      navigate(RoutePath.LOGIN);
    } catch (error) {
      handleError(error);
    }
  };

  const loginSubmitHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  useEffect(() => {
    if (isLogin) {
      if (isEmail(email) && password.trim().length > 4) {
        setIsValid(true);
      } else {
        setIsValid(false);
      }
    } else {
      if (
        isEmail(email) &&
        name.trim().length > 2 &&
        password.trim().length > 4 &&
        password.trim() === password2.trim()
      ) {
        setIsValid(true);
      } else {
        setIsValid(false);
      }
    }
  }, [isLogin, email, name, password, password2]);

  return (
    <div className="content">
      <div className="container">
        <h2 className="content__title">
          {isLogin ? 'Авторизация' : 'Регистрация'}
        </h2>
        <form onSubmit={isLogin ? loginSubmitHandler : signupSubmitHandler}>
          <div className="form">
            <div className="form__control">
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={inputChangeHandler}
                placeholder="Введите e-mail"
              />
            </div>
            {!isLogin && (
              <div className="form__control">
                <label htmlFor="name">Имя</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={inputChangeHandler}
                  placeholder="Введите имя"
                />
                <span className="form__hint">Не менее 3 символов</span>
              </div>
            )}
            <div className="form__control">
              <label htmlFor="password">Пароль</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={inputChangeHandler}
                placeholder="Введите пароль"
              />
              <span className="form__hint">Не менее 5 символов</span>
            </div>
            {!isLogin && (
              <div className="form__control">
                <label htmlFor="password2">Повторите пароль</label>
                <input
                  type="password"
                  id="password2"
                  name="password2"
                  value={password2}
                  onChange={inputChangeHandler}
                  placeholder="Повторите пароль"
                />
              </div>
            )}
            <div className="form__actions">
              {isLogin ? (
                <>
                  <Link to={RoutePath.SIGNUP}>Зарегистрироваться</Link>
                  <button type="submit" className="button" disabled={!isValid}>
                    Войти
                  </button>
                </>
              ) : (
                <>
                  <Link to={RoutePath.LOGIN}>Войти</Link>
                  <button type="submit" className="button" disabled={!isValid}>
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
