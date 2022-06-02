import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useChangeInput } from '../../hooks/useChangeInput';
import { uploadDiary } from '../../services/diary';
import Modal from '../../components/Common/Modal/Modal';
import styles from './createDiary.module.scss';

const CreateDiary = () => {
  const [visibleModal, setVisibleModal] = useState(false);
  const navigate = useNavigate();
  const titleValue = useChangeInput('');
  const contentValue = useChangeInput('');
  const { state, stateChangeHandler } = titleValue;
  const { state: contentState, stateChangeHandler: contetnHandler } = contentValue;
  const localStorageId = localStorage.getItem('id');
  const [message, setMessage] = useState('');

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (!localStorageId) {
      setVisibleModal(true);
      setMessage('로그인을 한 후 이용해주세요.');
      timer = setTimeout(() => {
        navigate('/signin');
      }, 1500);
    }
    return () => {
      setVisibleModal(false);
      clearTimeout(timer);
    };
  }, [localStorageId, navigate]);

  const uploadClickHandler = async () => {
    try {
      if (localStorageId) {
        const upload = await uploadDiary({ userId: localStorageId, title: state, content: contentState });
        if (upload.success) {
          navigate('/');
        }
      }
    } catch (error) {
      setMessage('서버에 문제가 있습니다.');
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.contentWrap}>
        <h2>제목</h2>
        <input
          placeholder='제목을 입력해주세요.'
          autoComplete='off'
          id='search'
          type='text'
          value={state}
          onChange={stateChangeHandler}
        />
        <h2>내용</h2>
        <textarea
          value={contentState}
          onChange={contetnHandler}
          autoComplete='off'
          placeholder='내용을 입력해주세요.'
          className={styles.contentInput}
        />
        <button type='button' onClick={uploadClickHandler}>
          Upload
        </button>
        {visibleModal && <Modal title='알림' desc={message} setVisibleModal={setVisibleModal} />}
      </div>
    </main>
  );
};

export default CreateDiary;
