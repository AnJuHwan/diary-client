import React, { ChangeEvent, useState } from 'react';
import { CloseEyesIcon, ShowEyesIcon } from '../../../assets';
import styles from './input.module.scss';

interface IProps {
  title: string;
  id: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  isError?: string;
  icon?: boolean;
}

const Input = ({ value, onChange, onBlur, isError, title, id, icon = false }: IProps) => {
  const [visiblePassword, setVisiblePassword] = useState(false);
  const visiblePasswordHandler = () => {
    if (setVisiblePassword) {
      setVisiblePassword((visible) => !visible);
    }
  };

  return (
    <div className={styles.inputBox}>
      {icon && (
        <button type='button' onClick={visiblePasswordHandler}>
          {visiblePassword ? <ShowEyesIcon className={styles.icon} /> : <CloseEyesIcon className={styles.icon} />}
        </button>
      )}
      <label htmlFor={id}>{title}</label>
      <input
        autoComplete='off'
        type={visiblePassword ? 'text' : 'password'}
        id={id}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      {isError && <span>{isError}</span>}
    </div>
  );
};
export default Input;
