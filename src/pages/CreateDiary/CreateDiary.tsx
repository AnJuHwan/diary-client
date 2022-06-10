import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useChangeInput } from '../../hooks/useChangeInput';
import { uploadDiary } from '../../services/diary';
import styles from './createDiary.module.scss';
import { storage } from '../../utils/firebase';
import { diaryPublicState } from '../../recoil/diary';
import ShareDiarySelect from '../../components/Common/ShareDiarySelect/ShareDiarySelect';
import Modal from '../../components/Common/Modal/Modal';
import DiaryButton from '../../components/Common/DiaryButton/DiaryButton';
import MainContainer from '../../components/Common/MainContainer/MainContainer';
import FileInput from '../../components/Common/Input/FileInput';
import { nowDate } from '../../utils/dayjs';

let timer: NodeJS.Timeout;
const CreateDiary = () => {
  const diaryPublic = useRecoilValue(diaryPublicState);
  const [visibleModal, setVisibleModal] = useState(false);
  const [message, setMessage] = useState('');
  const [image, setImage] = useState<null | Blob | Uint8Array | ArrayBuffer>(null);
  const navigate = useNavigate();
  const titleValue = useChangeInput('');
  const contentValue = useChangeInput('');
  const { state, stateChangeHandler } = titleValue;
  const { state: contentState, stateChangeHandler: contentHandler } = contentValue;
  const localStorageId = localStorage.getItem('id');

  useEffect(() => {
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
    if (!localStorageId) return;
    try {
      if (image == null) {
        const upload = await uploadDiary({
          userId: localStorageId,
          title: state,
          content: contentState,
          postImage: '',
          sharePost: diaryPublic,
          date: nowDate,
          writer: localStorageId,
        });
        if (upload.success) {
          navigate('/');
        }
        return;
      }

      const imageRef = ref(storage, `images/diary/${localStorageId}/${state}`);
      uploadBytes(imageRef, image).then(() => {
        getDownloadURL(imageRef).then(async (item) => {
          const upload = await uploadDiary({
            userId: localStorageId,
            title: state,
            content: contentState,
            postImage: item,
            sharePost: diaryPublic,
            date: nowDate,
            writer: localStorageId,
          });
          if (upload.success) {
            navigate('/');
          }
        });
      });
      setVisibleModal(false);
      return;
    } catch (error: any) {
      setMessage(error.message);
    }
  };

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setImage(e.currentTarget.files![0]);
  };

  return (
    <MainContainer>
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
          onChange={contentHandler}
          autoComplete='off'
          placeholder='내용을 입력해주세요.'
          className={styles.contentInput}
        />
        <ShareDiarySelect />
        <FileInput onChange={inputChangeHandler} />
        <DiaryButton onClick={uploadClickHandler} text='Upload' />

        {visibleModal && <Modal title='알림' desc={message} setVisibleModal={setVisibleModal} />}
      </div>
    </MainContainer>
  );
};

export default CreateDiary;
