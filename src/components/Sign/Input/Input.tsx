import React, { ChangeEvent } from 'react';
import styles from './input.module.scss';

interface IProps {
  title: string;
  id: string;
  type: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  isError?: string;
}

const Input = ({ value, onChange, onBlur, isError, title, id, type }: IProps) => {
  return (
    <div className={styles.inputBox}>
      <label htmlFor={id}>{title}</label>
      <input autoComplete='off' type={type} id={id} value={value} onChange={onChange} onBlur={onBlur} />
      {isError && <span>{isError}</span>}
    </div>
  );
};
export default Input;
