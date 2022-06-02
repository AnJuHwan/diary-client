import { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import styles from './modal.module.scss';

interface IProps {
  children?: JSX.Element | JSX.Element[];
  setVisibleModal: (visible: boolean) => void;
  title: string;
  desc: string;
}

const Modal = ({ setVisibleModal, title, desc }: IProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

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

  return ReactDOM.createPortal(
    <div className={styles.wrapper}>
      <div className={styles.modal} ref={modalRef}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.desc}>{desc}</p>
        <button type='button' onClick={closeModal}>
          확인
        </button>
      </div>
    </div>,
    document.getElementById('modal') as HTMLElement
  );
};

export default Modal;
