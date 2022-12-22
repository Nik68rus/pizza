import { useState, useEffect, useRef, useCallback } from 'react';
import { FaCaretDown, FaCaretUp } from 'react-icons/fa';
import classes from './Select.module.scss';
import cx from 'classnames';

interface Props<T> {
  items: T[];
  label: string;
  onSelect: (item: T) => void;
  invalid?: boolean;
}

const Select = <T extends { id: number; title: string }>({
  items,
  label,
  onSelect,
  invalid,
}: Props<T>) => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(items[0].id);
  const popupRef = useRef(null);

  const itemClickHandler = useCallback(
    (item: T) => {
      setActive(item.id);
      onSelect(item);
    },
    [onSelect]
  );

  const docClickHandler = useCallback((e: MouseEvent) => {
    setTimeout(() => {
      document.addEventListener('click', () => setOpen(false), { once: true });
    }, 10);
  }, []);

  useEffect(() => {
    if (open) {
      document.addEventListener('click', docClickHandler, { once: true });
    }

    return () => {
      document.removeEventListener('click', docClickHandler);
    };
  }, [open, docClickHandler]);

  return (
    <div className={cx(classes.select, { [classes.invalid]: invalid })}>
      <div className={classes.label}>
        {open ? <FaCaretUp /> : <FaCaretDown />}
        <b>{label}</b>
        <span onClick={() => setOpen(!open)}>
          {items.find((item) => item.id === active)?.title || 'Выберите'}
        </span>
      </div>
      {open && (
        <div className={classes.popup} ref={popupRef}>
          <ul>
            {items.map((item) => (
              <li
                key={item.id}
                className={active === item.id ? classes.active : ''}
                onClick={itemClickHandler.bind(this, item)}
              >
                {item.title}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Select;
