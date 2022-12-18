import React from 'react';
import { createPortal } from 'react-dom';
import { FaTimes } from 'react-icons/fa';
const modalRoot = document.getElementById('modal-root')!;

type Props = {
  children: React.ReactNode;
  onClose: () => void;
  heading: string;
};

const Modal = ({ children, onClose, heading }: Props) => {
  return createPortal(
    <section className="modal">
      <div className="modal__overlay" onClick={onClose} />
      <div className="modal__content">
        <button
          aria-label="Закрыть модальное окно"
          onClick={onClose}
          className="modal__close-btn"
        >
          <FaTimes />
        </button>
        <h2 className="modal__heading">{heading}</h2>
        <div className="modal__body">{children}</div>
      </div>
    </section>,
    modalRoot
  );
};

export default Modal;
