import { useNavigate } from 'react-router-dom';
import { useChangeInput } from '../../hooks/useChangeInput';
import { uploadDiary } from '../../services/diary';
import styles from './createDiary.module.scss';

const CreateDiary = () => {
  const titleValue = useChangeInput('');
  const contentValue = useChangeInput('');
  const { state, stateChangeHandler } = titleValue;
  const { state: contentState, stateChangeHandler: contetnHandler } = contentValue;
  const localStorageId = localStorage.getItem('id');
  const navigate = useNavigate();

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
        <input
          placeholder='제목을 입력해주세요.'
          autoComplete='off'
          id='search'
          type='text'
          value={state}
          onChange={stateChangeHandler}
        />
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
