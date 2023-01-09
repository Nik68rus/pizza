import { useState, useEffect } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import isEmail from 'validator/lib/isEmail';
import { handleError } from '../helpers/error-handler';
import { createUser, loginUser } from '../http/userAPI';
import { RoutePath } from '../types/routes';
import { IUserRegData } from '../types/user';

const Auth = () => {
  const location = useLocation();
  const [params] = useSearchParams();
  const user = params.get('user');
  const isLogin = location.pathname === RoutePath.LOGIN;
  const [isValid, setIsValid] = useState(false);
  const [activationNeeded, setActivationNeeded] = useState(false);

  const initialState: IUserRegData = {
    email: user && isLogin ? user : '',
    name: '',
    password: '',
    password2: '',
  };

  const [formData, setFormData] = useState<IUserRegData>(initialState);

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
      const userData = await createUser(formData);
      toast.success(
        `Пользователь ${userData.name} успешно зарегистрирован. Для полноценной работы активируйте аккаунт по ссылке, отправленной на почту ${userData.email}!`
      );
      setActivationNeeded(true);
    } catch (error) {
      handleError(error);
    }
  };

  const loginSubmitHandler: React.FormEventHandler<HTMLFormElement> = async (
    e
  ) => {
    e.preventDefault();
    try {
      const userData = await loginUser({
        email: formData.email,
        password: formData.password,
      });
      console.log(userData);
      document.cookie = `refreshToken=${userData.refreshToken};`;

      localStorage.setItem('accesToken', userData.accessToken);
    } catch (error) {
      handleError(error);
    }
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

  if (activationNeeded) {
    return (
      <div className="content">
        <div className="container">
          <h2 className="content__title">Активация учетной записи</h2>
          <p>
            Создан аккаунт для пользователя {formData.name}. Активируйте учетную
            записи по ссылке в письме, отправленном на вашу электронную почту{' '}
            {formData.email}
          </p>
          <div className="content__actions">
            <Link to={RoutePath.HOME} className="button">
              На главную
            </Link>
            <Link to={RoutePath.LOGIN} className="button">
              Войти
            </Link>
          </div>
        </div>
      </div>
    );
  }

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
