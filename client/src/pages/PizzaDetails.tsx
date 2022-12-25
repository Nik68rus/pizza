import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import cx from 'classnames';
import Spinner from '../components/Spinner';
import { useAppDispatch, useAppSelector } from '../hooks/store';
import {
  fetchPizzaById,
  resetActiveState,
  selectActivePizza,
  selectPizzaLoading,
} from '../store/slices/pizzaSlice';

import classes from './PizzaDetails.module.scss';

const PizzaDetails = () => {
  const { pizzaId } = useParams<{ pizzaId: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const activePizza = useAppSelector(selectActivePizza);
  const loading = useAppSelector(selectPizzaLoading);

  useEffect(() => {
    dispatch(fetchPizzaById(+pizzaId!));

    return () => {
      dispatch(resetActiveState());
    };
  }, [pizzaId, navigate, dispatch]);

  useEffect(() => {
    if (loading === 'failed') {
      navigate('/404');
    }
  }, [loading, navigate]);

  const goBackHandler = () => {
    navigate(-1);
  };

  if (loading === 'loading' || !activePizza) {
    return <Spinner />;
  }

  return (
    <div className={cx('container', classes.details)}>
      <h1>{activePizza.title}</h1>
      <img src={activePizza.imageUrl} alt={activePizza.title} />
      <p>
        Доступные размеры:{' '}
        {activePizza.sizes.map((size) => `${size} см`).join(', ')}
      </p>
      <p>Доступное тесто: {activePizza.bases.join(', ')}</p>
      <button className="button" onClick={goBackHandler}>
        Назад
      </button>
    </div>
  );
};

export default PizzaDetails;
