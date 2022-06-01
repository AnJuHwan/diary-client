import React from 'react';
import { useNavigate } from 'react-router-dom';

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

  return (
    <li className={styles.diaryItem}>
      <button type='button' onClick={diaryClickHandler}>
        제목: {diary.title}
      </button>
    </li>
  );
};

export default DiaryItem;
