import React from 'react';
import { IDiary } from '../../../types/diary';
import styles from './diary.module.scss';

interface IProps {
  diary: IDiary;
}

const DiaryItem = ({ diary }: IProps) => {
  return (
    <li className={styles.diaryItem}>
      <button type='button'>제목: {diary.title}</button>
    </li>
  );
};

export default DiaryItem;
