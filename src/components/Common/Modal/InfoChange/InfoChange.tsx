import { ChangeEvent, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import styles from './infoChange.module.scss';

interface IProps {
  children?: JSX.Element | JSX.Element[];
  userValue: string;
  setVisibleModal: (visible: boolean) => void;
  type?: string;
}

const InfoChange = ({ setVisibleModal, userValue, type = 'text' }: IProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [inputValue, setInputValue] = useState(userValue);

  useEffect(() => {
    const closeDropdownHandler = (event: MouseEvent): void => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setVisibleModal(false);
      }
    };

    document.addEventListener('mousedown', closeDropdownHandler);
    return () => {
      document.addEventListener('mousedown', closeDropdownHandler);
    };
  }, [setVisibleModal]);

  const closeModal = () => {
    setVisibleModal(false);
  };

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  };

  return ReactDOM.createPortal(
    <div className={styles.wrapper}>
      <div className={styles.modal} ref={modalRef}>
        <input type={type} value={inputValue} onChange={inputChangeHandler} />
        <button type='button' onClick={closeModal}>
          변경
        </button>
      </div>
    </div>,
    document.getElementById('modal') as HTMLElement
  );
};

export default InfoChange;
