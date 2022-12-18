import React from 'react';
import Modal from './Modal';

type Props = {
  onClose: () => void;
  onSubmit: (title: string) => void;
  heading: string;
};

const AddCategoryModal = ({ onClose, heading, onSubmit }: Props) => {
  const [title, setTitle] = React.useState('');

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(title.trim());
  };

  return (
    <Modal onClose={onClose} heading={heading}>
      <form onSubmit={submitHandler}>
        <div className="form">
          <div className="form__control">
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

export default AddCategoryModal;
