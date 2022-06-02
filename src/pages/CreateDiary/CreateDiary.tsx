import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useChangeInput } from '../../hooks/useChangeInput';
import { useIsLoginPage } from '../../hooks/useIsLoginPage';
import { uploadDiary } from '../../services/diary';
import styles from './createDiary.module.scss';

const CreateDiary = () => {
  const navigate = useNavigate();
  const titleValue = useChangeInput('');
  const contentValue = useChangeInput('');
  const { state, stateChangeHandler } = titleValue;
  const { state: contentState, stateChangeHandler: contetnHandler } = contentValue;
  const localStorageId = localStorage.getItem('id');
  const isLogin = useIsLoginPage();

  const uploadClickHandler = async () => {
    if (localStorageId) {
      const upload = await uploadDiary({ userId: localStorageId, title: state, content: contentState });
      if (upload.success) {
        navigate('/');
      }
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
      </div>
    </main>
  );
};

export default CreateDiary;
