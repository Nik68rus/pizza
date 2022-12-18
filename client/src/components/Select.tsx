import { useState } from 'react';
import { FaCaretDown, FaCaretUp } from 'react-icons/fa';
import classes from './Select.module.scss';
import cx from 'classnames';

type Props = {
  items: { title: string; id: number }[];
  label: string;
  onSelect: (id: number) => void;
  invalid?: boolean;
};

const Select = ({ items, label, onSelect, invalid }: Props) => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(items[0].id);

  const itemClickHandler = (id: number) => {
    setActive(id);
    setOpen(false);
    onSelect(id);
  };

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
        <div className={classes.popup}>
          <ul>
            {items.map((item) => (
              <li
                key={item.id}
                className={active === item.id ? classes.active : ''}
                onClick={itemClickHandler.bind(this, item.id)}
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