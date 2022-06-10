import { useNavigate } from 'react-router-dom';
import { createSecureContext } from 'tls';

import { IDiary } from '../../../types/diary';
import styles from './diary.module.scss';

interface IProps {
  diary: IDiary;
  // onClick: (id: string) => void;
  id: string;
}

const DiaryItem = ({ diary, id }: IProps) => {
  const navigate = useNavigate();

  const diaryClickHandler = () => {
    navigate(`/detail/${id}`);
  };

  console.log(diary);

  return (
    <li className={styles.diaryItem}>
      <button type='button' onClick={diaryClickHandler}>
        {diary.postImage && <img src={diary.postImage} alt='none' className={styles.image} />}
        제목: {diary.title}
      </button>
    </li>
  );
};

export default DiaryItem;
