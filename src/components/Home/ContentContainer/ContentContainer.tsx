import { useRecoilValue } from 'recoil';
import { diaryFilterListState, diaryListState } from '../../../recoil/diary';
import DiaryItem from '../Diary/DiaryItem';
import styles from './contentContainer.module.scss';

// interface IProps {
//   diary: IDiary[];
// }

const ContentContainer = () => {
  const diaryList = useRecoilValue(diaryListState);
  const diaryFilterList = useRecoilValue(diaryFilterListState);
  const list = diaryFilterList.length !== 0 ? diaryFilterList : diaryList;

  return (
    <ul className={styles.contentWrap}>
      {list.map((diary) => {
        const { _id: id } = diary;
        return <DiaryItem key={`${id}`} diary={diary} id={id} />;
      })}
    </ul>
  );
};

export default ContentContainer;
