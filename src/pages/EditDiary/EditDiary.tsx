import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { diaryDetailState, diaryPublicState } from '../../recoil/diary';
import { editDiary, getDetailDiary } from '../../services/diary';
import { IDetailData } from '../../types/diary';
import { nowDate } from '../../utils/dayjs';
import { storage } from '../../utils/firebase';
import Loading from '../../components/Common/Loading/Loading';
import DiaryButton from '../../components/Common/DiaryButton/DiaryButton';
import Modal from '../../components/Common/Modal/Modal';
import MainContainer from '../../components/Common/MainContainer/MainContainer';
import ShareDiarySelect from '../../components/Common/ShareDiarySelect/ShareDiarySelect';
import FileInput from '../../components/Common/Input/FileInput';
import styles from './editDiary.module.scss';

let timer: NodeJS.Timeout;
const EditDiary = () => {
  const [detail, setDetail] = useRecoilState<IDetailData>(diaryDetailState);
  const { title: dTitle, content: dContent } = detail;
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  const localStorageId = localStorage.getItem('id');
  const [visibleModal, setVisibleModal] = useState(false);
  const [message, setMessage] = useState('');
  const [editImage, setEditImage] = useState<null | Blob | Uint8Array | ArrayBuffer>(null);
  const diaryPublic = useRecoilValue(diaryPublicState);

  useEffect(() => {
    if (!localStorageId) {
      setVisibleModal(true);
      setMessage('로그인 후 이용해주세요.');
      timer = setTimeout(() => {
        navigate('/signin');
      }, 1500);
    }
    return () => {
      setVisibleModal(false);
      clearTimeout(timer);
    };
  }, [localStorageId, navigate]);

  useEffect(() => {
    const getDetailDiaryItem = async () => {
      if (params.id) {
        const detailDiary = await getDetailDiary(params.id);
        const { _id: id, title, content, userId, postImage, sharePost, date } = detailDiary.postItem;
        if (detailDiary.success && detailDiary.postItem) {
          setDetail({ id, title, content, userId, postImage, sharePost, date });
        }
      }
    };
    getDetailDiaryItem();
  }, [params.id, setDetail]);

  const titleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setDetail({ ...detail, title: e.currentTarget.value });
  };

  const contentChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDetail({ ...detail, content: e.currentTarget.value });
  };

  const editDiaryHandler = async () => {
    if (!params.id) return;
    try {
      setIsLoading(true);
      if (editImage == null) {
        const editItem = await editDiary({
          id: params.id,
          title: detail.title,
          content: detail.content,
          postImage: '',
          sharePost: diaryPublic,
          date: nowDate,
        });
        if (editItem.success) {
          navigate(`/detail/${params.id}`);
        }
        return;
      }

      const imageRef = ref(storage, `images/diary/${localStorageId}/${detail.title}`);
      uploadBytes(imageRef, editImage).then(() => {
        getDownloadURL(imageRef).then(async (item) => {
          if (!params.id) return;
          const editItem = await editDiary({
            id: params.id,
            title: detail.title,
            content: detail.content,
            postImage: item,
            sharePost: diaryPublic,
            date: nowDate,
          });

          if (editItem.success) {
            navigate('/');
          }
        });
      });
    } catch (error) {
      setMessage('서버에 문제가 있습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setEditImage(e.currentTarget.files![0]);
  };

  return (
    <MainContainer>
      {dTitle && (
        <div className={styles.contentWrap}>
          <h2>제목</h2>
          <input
            placeholder='제목을 입력해주세요.'
            autoComplete='off'
            id='search'
            type='text'
            value={dTitle}
            onChange={titleChangeHandler}
          />
          <h2>내용</h2>
          <textarea
            value={dContent}
            onChange={contentChangeHandler}
            autoComplete='off'
            placeholder='내용을 입력해주세요.'
            className={styles.contentInput}
          />
          <ShareDiarySelect />

          <FileInput onChange={inputChangeHandler} />
          <DiaryButton onClick={editDiaryHandler} text='Edit Confirm' />

          {isLoading && <Loading />}
          {visibleModal && <Modal title='알림' desc={message} setVisibleModal={setVisibleModal} />}
        </div>
      )}
    </MainContainer>
  );
};

export default EditDiary;
