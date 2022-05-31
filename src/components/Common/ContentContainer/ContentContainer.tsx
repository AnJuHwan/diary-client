import React from 'react';
import { useRecoilValue } from 'recoil';
import { diaryListState } from '../../../recoil/diary';
import DiaryItem from '../../Home/Diary/DiaryItem';
import styles from './contentContainer.module.scss';

const ContentContainer = () => {
  const diaryList = useRecoilValue(diaryListState);

  return (
    <ul className={styles.contentWrap}>
      {diaryList.map((diary) => {
        const { _id: id } = diary;
        return <DiaryItem key={`${id}`} diary={diary} />;
      })}
    </ul>
  );
};

export default ContentContainer;
