import { ChangeEvent, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { diaryDetailState } from '../../recoil/diary';
import { getDetailDiary } from '../../services/diary';
import { IDetailData } from '../../types/diary';
import styles from './editDiary.module.scss';

const EditDiary = () => {
  const [detail, setDetail] = useRecoilState<IDetailData>(diaryDetailState);
  const { title: dTitle, content: dContent } = detail;
  const params = useParams();

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

  return (
    <main className={styles.main}>
      {dTitle && (
        <div className={styles.contentWrap}>
          <input
            placeholder='제목을 입력해주세요.'
            autoComplete='off'
            id='search'
            type='text'
            value={dTitle}
            onChange={titleChangeHandler}
          />
          <textarea
            value={dContent}
            onChange={contentChangeHandler}
            autoComplete='off'
            placeholder='내용을 입력해주세요.'
            className={styles.contentInput}
          />
          <button type='button'>Edit Confirm</button>
        </div>
      )}
    </main>
  );
};

export default EditDiary;
