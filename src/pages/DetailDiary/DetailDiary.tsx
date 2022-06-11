import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { diaryDetailState } from '../../recoil/diary';
import { deleteDiary, getDetailDiary } from '../../services/diary';
import { IDetailData } from '../../types/diary';
import Modal from '../../components/Common/Modal/Modal';
import styles from './detailDiary.module.scss';

let timer: NodeJS.Timeout;
const DetailDiary = () => {
  const params = useParams();
  const localStorageId = localStorage.getItem('id');
  const navigate = useNavigate();
  const [detail, setDetail] = useRecoilState<IDetailData>(diaryDetailState);
  const { title: dTitle, content: dContent, postImage: image } = detail;

  const [visibleModal, setVisibleModal] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!localStorageId) {
      setVisibleModal(true);
      setMessage('로그인 후 이용해주세요');
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

  const deleteDiaryHandler = async () => {
    if (params.id) {
      const detailDiary = await deleteDiary(params.id);
      if (detailDiary.success) {
        setVisibleModal(true);
        setMessage('다이어리가 삭제되었습니다.');
        clearTimeout(timer);
        timer = setTimeout(() => {
          navigate('/');
        }, 2000);
      }
    }
  };

  return (
    <main className={styles.main}>
      {image && <img className={styles.postImage} src={image} alt='다이어리 이미지' />}
      {dTitle && (
        <div className={styles.contentWrap}>
          <h2>제목</h2>
          <div className={styles.title}>{dTitle}</div>
          <h2>내용</h2>
          <textarea className={styles.content} value={dContent} readOnly />

          <div className={styles.buttonBox}>
            {localStorageId === detail.userId && (
              <>
                <Link to={`/edit/${params.id}`} className={styles.link}>
                  Edit
                </Link>
                <button type='button' onClick={deleteDiaryHandler}>
                  Delete
                </button>
              </>
            )}
          </div>
        </div>
      )}
      {visibleModal && <Modal title='알림' desc={message} setVisibleModal={setVisibleModal} />}
    </main>
  );
};

export default DetailDiary;
