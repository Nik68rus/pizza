import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { RoutePath } from '../types/routes';

const Activation = () => {
  const [params] = useSearchParams();
  const mail = params.get('mail');
  const success = params.get('success') === 'true';

  return (
    <div className="content">
      <div className="container">
        <h2 className="content__title">Активация учетной записи</h2>
        <p>
          {success
            ? `Аккаунт ${mail} успешно активирован! Вы можете авторизоваться!`
            : 'Ссылка больше не активна!'}
        </p>
        <div className="content__actions">
          <Link to={RoutePath.HOME} className="button">
            На главную
          </Link>
          <Link
            to={`${RoutePath.LOGIN}${mail ? `?user=${mail}` : ''}`}
            className="button"
          >
            Войти
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Activation;
