import { ChangeEvent, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { useRecoilState } from 'recoil';
import { userState } from '../../../../recoil/user';
import { userNicknameUpdate } from '../../../../services/userUpdate';
import styles from './infoChange.module.scss';

interface IProps {
  children?: JSX.Element | JSX.Element[];
  userValue: string;
  setVisibleModal: (visible: boolean) => void;
  type?: string;
  category: string;
}

const InfoChange = ({ setVisibleModal, userValue, type = 'text', category }: IProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const localStorageId = localStorage.getItem('id');
  const [inputValue, setInputValue] = useState(userValue);
  const [message, setMessage] = useState('');
  const [userInfo, setUserInfo] = useRecoilState(userState);

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

  const changeUserInfoHandler = async () => {
    const keyValue = {
      Nickname: { ...userInfo, nickname: inputValue },
      Image: { ...userInfo, profile: inputValue },
      Email: { ...userInfo, email: inputValue },
    }[category];

    if (inputValue.trim().length === 0) {
      setMessage('닉네임을 입력해주세요.');
      return;
    }

    if (localStorageId) {
      try {
        const updateNickname = await userNicknameUpdate(localStorageId, inputValue);
        if (updateNickname.success) {
          setVisibleModal(false);
          setMessage('');
          setUserInfo(keyValue!);
        }
      } catch (error: any) {
        setMessage(error.message);
      }
    }
  };

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  };

  return ReactDOM.createPortal(
    <div className={styles.wrapper}>
      <div className={styles.modal} ref={modalRef}>
        <input type={type} value={inputValue} onChange={inputChangeHandler} />
        <button type='button' onClick={changeUserInfoHandler}>
          변경
        </button>
        {message && <span className={styles.errorMessage}>{message}</span>}
      </div>
    </div>,
    document.getElementById('modal') as HTMLElement
  );
};

export default InfoChange;
