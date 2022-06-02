import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { diaryDetailState } from '../../recoil/diary';
import { editDiary, getDetailDiary } from '../../services/diary';
import { IDetailData } from '../../types/diary';
import Loading from '../../components/Common/Loading/Loading';
import Modal from '../../components/Common/Modal/Modal';
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
        const { _id: id, title, content, userId } = detailDiary.postItem;
        if (detailDiary.success && detailDiary.postItem) {
          setDetail({ id, title, content, userId });
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
    try {
      setIsLoading(true);
      if (params.id) {
        const editItem = await editDiary({ id: params.id, title: detail.title, content: detail.content });
        if (editItem.success) {
          navigate(`/detail/${params.id}`);
        }
      }
    } catch (error) {
      setMessage('서버에 문제가 있습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className={styles.main}>
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
          <button type='button' onClick={editDiaryHandler}>
            Edit Confirm
          </button>
          {isLoading && <Loading />}
          {visibleModal && <Modal title='알림' desc={message} setVisibleModal={setVisibleModal} />}
        </div>
      )}
    </main>
  );
};

export default EditDiary;
