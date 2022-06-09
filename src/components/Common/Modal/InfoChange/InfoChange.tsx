import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { imageLoading } from '../../../../recoil/loading';
import { userState } from '../../../../recoil/user';
import { userNicknameUpdate, userProfileUpdate } from '../../../../services/userUpdate';
import { storage } from '../../../../utils/firebase';
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
  const [image, setImage] = useState<null | Blob | Uint8Array | ArrayBuffer>(null);
  const setLoading = useSetRecoilState(imageLoading);

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
    if (category === 'Image') {
      try {
        setLoading(true);
        if (image == null) return;
        const imageRef = ref(storage, `images/${userInfo.nickName}`);
        uploadBytes(imageRef, image).then(() => {
          getDownloadURL(imageRef).then((item) => {
            if (localStorageId) {
              userProfileUpdate(localStorageId, item);
            }
            setUserInfo({ ...userInfo, profile: item });
          });
          setLoading(false);
        });
        setVisibleModal(false);
        return;
      } catch (error: any) {
        // eslint-disable-next-line no-console
        console.log(error.message);
      }
    }

    if (inputValue.trim().length === 0) {
      setMessage('값을 입력해주세요.');
      return;
    }

    if (category === 'Nickname') {
      if (localStorageId) {
        try {
          const updateNickname = await userNicknameUpdate(localStorageId, inputValue);
          if (updateNickname.success) {
            setVisibleModal(false);
            setMessage('');
            setUserInfo({ ...userInfo, nickName: inputValue });
          }
        } catch (error: any) {
          setMessage(error.message);
        }
      }
    }

    // if (category === 'Password') {
    //   if (localStorageId) {
    //     try {
    //       const updateNickname = await userNicknameUpdate(localStorageId, inputValue);
    //       if (updateNickname.success) {
    //         setVisibleModal(false);
    //         setMessage('');
    //         setUserInfo({ ...userInfo, nickName: inputValue });
    //       }
    //     } catch (error: any) {
    //       setMessage(error.message);
    //     }
    //   }
    // }
  };

  const basicImageHandler = () => {
    if (!localStorageId) return;
    userProfileUpdate(localStorageId, '');
    setUserInfo({ ...userInfo, profile: '' });
    setVisibleModal(false);
  };

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (category === 'Image') {
      setImage(e.currentTarget.files![0]);
      return;
    }
    setInputValue(e.currentTarget.value);
  };

  return ReactDOM.createPortal(
    <div className={styles.wrapper}>
      <div className={styles.modal} ref={modalRef}>
        <input type={type} accept='image/*' onChange={inputChangeHandler} />
        {type === 'file' && (
          <button type='button' onClick={basicImageHandler}>
            기본이미지 변경
          </button>
        )}
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
