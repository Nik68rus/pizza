import { useState, useEffect } from 'react';
import { handleError } from '../../helpers/error-handler';
import { getCategories } from '../../http/categoryAPI';
import { ICategory, IPizzaInput } from '../../types';
import Select from '../Select';
import Modal from './Modal';
import validator from 'validator';
import cx from 'classnames';

type Props = {
  onClose: () => void;
  onSubmit: (pizza: IPizzaInput) => void;
  heading: string;
};

const AddPizzaModal = ({ onClose, heading, onSubmit }: Props) => {
  const [categories, setCategories] = useState<ICategory[]>([
    { id: 0, title: '' },
  ]);
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [selectedCat, setSelectedCat] = useState<null | number>(null);
  const [sizes, setSizes] = useState<number[]>([]);
  const [bases, setBases] = useState<string[]>([]);
  const [price, setPrice] = useState('');
  const [invalidInputs, setInvalidInputs] = useState<string[]>([]);

  const pizza = {
    title,
    imageUrl,
    categoryId: selectedCat,
    sizes: sizes.sort((a, b) => a - b),
    bases: bases.sort(),
    price: +price,
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const fetchedCategories = await getCategories();
        setCategories(fetchedCategories);
      } catch (err) {
        handleError(err);
      }
    };

    getData();
  }, []);

  const sizeChangeHandler = (e: React.FormEvent<HTMLFieldSetElement>) => {
    const target = e.target as HTMLInputElement;
    const value = +target.value;
    const wasChecked = sizes.find((size) => size === value);
    if (wasChecked) {
      setSizes(sizes.filter((size) => size !== value));
    } else {
      setSizes([...sizes, value]);
    }
  };

  const baseChangeHandler = (e: React.FormEvent<HTMLFieldSetElement>) => {
    const target = e.target as HTMLInputElement;
    const value = target.value;
    const wasChecked = bases.find((base) => base === value);
    if (wasChecked) {
      setBases(bases.filter((base) => base !== value));
    } else {
      setBases([...bases, value]);
    }
  };

  const validatePizza = (pizza: IPizzaInput) => {
    const addInvalid = (id: string) => {
      setInvalidInputs((prev) => [...prev, id]);
    };

    const removeInvalid = (id: string) => {
      setInvalidInputs((prev) => prev.filter((field) => field !== id));
    };

    !validator.isLength(title.trim(), { min: 3, max: 20 })
      ? addInvalid('name')
      : removeInvalid('name');

    selectedCat === null ? addInvalid('category') : removeInvalid('category');

    !validator.isURL(imageUrl)
      ? addInvalid('imageUrl')
      : removeInvalid('imageUrl');

    !sizes.length ? addInvalid('size') : removeInvalid('size');

    !bases.length ? addInvalid('base') : removeInvalid('base');
    !isNaN(+price) && +price < 10
      ? addInvalid('price')
      : removeInvalid('price');

    return invalidInputs.length === 0 ? true : false;
  };

  const formSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid = validatePizza(pizza);
    console.log(isValid);
    console.log(invalidInputs);

    if (isValid) {
      onSubmit(pizza);
    }
  };

  return (
    <Modal onClose={onClose} heading={heading}>
      <form onSubmit={formSubmitHandler}>
        <div className="form">
          <div
            className={cx('form__control', {
              'form__control--invalid': invalidInputs.find(
                (item) => item === 'name'
              ),
            })}
          >
            <label htmlFor="name">Название</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Введите название"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <Select
            items={categories}
            label="Выберите тип пиццы:"
            onSelect={(id) => setSelectedCat(id)}
            invalid={
              invalidInputs.find((item) => item === 'category') ? true : false
            }
          />
          <div
            className={cx('form__control', {
              'form__control--invalid':
                invalidInputs &&
                invalidInputs.find((item) => item === 'imageUrl'),
            })}
          >
            <label htmlFor="name">Изображение</label>
            <input
              type="text"
              id="imageUrl"
              name="imageUrl"
              placeholder="Введите ссылку на изображение"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </div>
          <fieldset
            onChange={sizeChangeHandler}
            className={cx({
              invalid: invalidInputs.find((item) => item === 'size'),
            })}
          >
            <legend>Доступные размеры:</legend>
            <div className="form__checkbox">
              <input type="checkbox" value="26" id="size26" name="size" />
              <label htmlFor="size26">26 см</label>
            </div>
            <div className="form__checkbox">
              <input type="checkbox" value="30" id="size30" name="size" />
              <label htmlFor="size30">30 см</label>
            </div>
            <div className="form__checkbox">
              <input type="checkbox" value="40" id="size40" name="size" />
              <label htmlFor="size40">40 см</label>
            </div>
          </fieldset>
          <fieldset
            onChange={baseChangeHandler}
            className={cx({
              invalid: invalidInputs.find((item) => item === 'base'),
            })}
          >
            <legend>Доступные основы:</legend>
            <div className="form__checkbox">
              <input
                type="checkbox"
                value="традиционное"
                id="base-st"
                name="base"
              />
              <label htmlFor="base-st">традиционное</label>
            </div>
            <div className="form__checkbox">
              <input type="checkbox" value="тонкое" id="base-sm" name="base" />
              <label htmlFor="base-sm">тонкое</label>
            </div>
          </fieldset>
          <div
            className={cx('form__control', {
              'form__control--invalid': invalidInputs.find(
                (item) => item === 'price'
              ),
            })}
          >
            <label htmlFor="name">Цена</label>
            <input
              type="number"
              id="price"
              name="price"
              placeholder="Введите стоимость"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="form__actions">
            <button type="button" className="button" onClick={onClose}>
              Отмена
            </button>
            <button type="submit" className="button">
              Добавить
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default AddPizzaModal;
