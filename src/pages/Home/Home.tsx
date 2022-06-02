import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { diaryListState } from '../../recoil/diary';
import { getMyDiary } from '../../services/diary';
import ContentContainer from '../../components/Home/ContentContainer/ContentContainer';
import styles from './home.module.scss';

const Home = () => {
  const setDiary = useSetRecoilState(diaryListState);
  const localStorageId = localStorage.getItem('id');

  useEffect(() => {
    const getDiaryData = async () => {
      if (localStorageId) {
        const diaryDatas = await getMyDiary(localStorageId);
        if (!diaryDatas) return;
        setDiary(diaryDatas);
      }
    };
    getDiaryData();
  }, [localStorageId, setDiary]);

  return (
    <main className={styles.main}>
      <div className={styles.titleBox}>
        <span>My Diary</span>
        <Link to='/create' className={styles.createLink}>
          Create Diary
        </Link>
      </div>
      <ContentContainer />
    </main>
  );
};

export default Home;
