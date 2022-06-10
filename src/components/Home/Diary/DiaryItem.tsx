import { useNavigate } from 'react-router-dom';
import { DefaultIcon } from '../../../assets';
import { IDiary } from '../../../types/diary';
import styles from './diary.module.scss';

interface IProps {
  diary: IDiary;
  id: string;
}

const DiaryItem = ({ diary, id }: IProps) => {
  const navigate = useNavigate();

  const diaryClickHandler = () => {
    navigate(`/detail/${id}`);
  };

  return (
    <li className={styles.diaryItem}>
      <button type='button' onClick={diaryClickHandler}>
        <div className={styles.diaryItemTop}>
          <div className={styles.userInfoBox}>
            {diary.writer && diary.writer.profile ? (
              <img className={styles.profile} src={diary.writer.profile} alt='profile' />
            ) : (
              <DefaultIcon />
            )}
            <span>{diary.writer && diary.writer.nickName} 님</span>
          </div>
          <span>{diary.date}</span>
        </div>
        {diary.postImage && <img src={diary.postImage} alt='이미지 찾을 수 없음' className={styles.image} />}
        <h2 className={styles.diaryTitle}>{diary.title}</h2>
      </button>
    </li>
  );
};

export default DiaryItem;
