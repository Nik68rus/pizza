import { Link } from 'react-router-dom';
import { RoutePath } from '../types/routes';

import classes from './NotFound.module.scss';

const NotFound = () => {
  return (
    <div className="content">
      <div className={'container ' + classes.notFound}>
        <h2 className={classes.info}>
          🫤 <br />
          Ничего не найдено!
        </h2>
        <Link to={RoutePath.HOME} className="button">
          На главную
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
