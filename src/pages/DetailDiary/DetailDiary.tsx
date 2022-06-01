import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import Modal from '../../components/Common/Modal/Modal';
import { diaryDetailState } from '../../recoil/diary';
import { deleteDiary, getDetailDiary } from '../../services/diary';
import { IDetailData } from '../../types/diary';
import styles from './detailDiary.module.scss';

const DetailDiary = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [detail, setDetail] = useRecoilState<IDetailData>(diaryDetailState);
  const { title: dTitle, content: dContent } = detail;
  const [visibleModal, setVisibleModal] = useState(false);
  let timer: NodeJS.Timeout;

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

  const deleteDiaryHandler = async () => {
    if (params.id) {
      const detailDiary = await deleteDiary(params.id);
      if (detailDiary.success) {
        setVisibleModal(true);
        clearTimeout(timer);
        timer = setTimeout(() => {
          navigate('/');
        }, 2000);
      }
    }
  };

  return (
    <main className={styles.main}>
      {dTitle && (
        <div className={styles.contentWrap}>
          <div className={styles.title}>{dTitle}</div>
          <div className={styles.content}>{dContent}</div>
          <div className={styles.buttonBox}>
            <Link to={`/edit/${params.id}`} className={styles.link}>
              Edit
            </Link>
            <button type='button' onClick={deleteDiaryHandler}>
              Delete
            </button>
          </div>
        </div>
      )}
      {visibleModal && <Modal title='삭제' desc='삭제되었습니다.' setVisibleModal={setVisibleModal} />}
    </main>
  );
};

export default DetailDiary;
