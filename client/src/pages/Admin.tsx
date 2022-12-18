import { useState } from 'react';
import { toast } from 'react-toastify';
import AddCategoryModal from '../components/modals/AddCategoryModal';
import AddPizzaModal from '../components/modals/AddPizzaModal';
import { handleError } from '../helpers/error-handler';
import { createCategory } from '../http/categoryAPI';
import { createPizza } from '../http/pizzaAPI';
import { IPizzaInput } from '../types';
import classes from './Admin.module.scss';

export interface CategoryRequestBody {
  title: string;
}

const Admin = () => {
  const [addPizzaVisible, setAddPizzaVisible] = useState(false);
  const [addCategoryVisible, setAddCategoryVisible] = useState(false);

  const addPizzaHandler = async (pizza: IPizzaInput) => {
    console.log('Add pizza submit');
    try {
      await createPizza(pizza);
      toast.success('Пицца добавлена');
      setAddPizzaVisible(false);
    } catch (error) {
      handleError(error);
    }
  };

  const addCategoryHandler = async (title: string) => {
    try {
      await createCategory(title);
      toast.success('Категория создана');
      setAddCategoryVisible(false);
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div className="content">
      <div className="container">
        <h2 className="content__title">Админ-панель</h2>
        <div className={classes.actions}>
          <button className="button" onClick={() => setAddPizzaVisible(true)}>
            Добавить пиццу
          </button>
          <button
            className="button"
            onClick={() => setAddCategoryVisible(true)}
          >
            Добавить категорию
          </button>
        </div>
      </div>
      {addPizzaVisible && (
        <AddPizzaModal
          onClose={() => setAddPizzaVisible(false)}
          onSubmit={addPizzaHandler}
          heading="Добавить пиццу"
        />
      )}
      {addCategoryVisible && (
        <AddCategoryModal
          onClose={() => setAddCategoryVisible(false)}
          onSubmit={addCategoryHandler}
          heading="Добавить категорию"
        />
      )}
    </div>
  );
};

export default Admin;
