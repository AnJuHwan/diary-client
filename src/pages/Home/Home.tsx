import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { diaryFilterListState, diaryListState } from '../../recoil/diary';
import { getMyDiary } from '../../services/diary';
import ContentContainer from '../../components/Home/ContentContainer/ContentContainer';
import styles from './home.module.scss';
import { SearchIcon } from '../../assets';
import { useChangeInput } from '../../hooks/useChangeInput';
import useDebounce from '../../hooks/useDebounce';
import MainContainer from '../../components/Common/MainContainer/MainContainer';

const Home = () => {
  const [diary, setDiary] = useRecoilState(diaryListState);
  const localStorageId = localStorage.getItem('id');
  const { state, stateChangeHandler } = useChangeInput('');
  const debounce = useDebounce(state);
  const diaryFilterList = useSetRecoilState(diaryFilterListState);

  useEffect(() => {
    const filterList = diary.filter((item) => item.title === state);
    diaryFilterList(filterList);
  }, [debounce, diaryFilterList, diary, state]);

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
    <MainContainer>
      <div className={styles.titleBox}>
        <div className={styles.diaryTop}>
          <span>My Diary</span>
          <Link to='/create' className={styles.createLink}>
            Create Diary
          </Link>
        </div>

        <div className={styles.searchCreateBox}>
          <div className={styles.inputBox}>
            <SearchIcon className={styles.searchIcon} />
            <input
              id='search'
              type='text'
              placeholder='검색어를 입력해보세요.'
              value={state}
              onChange={stateChangeHandler}
            />
          </div>
        </div>
      </div>
      <ContentContainer />
    </MainContainer>
  );
};

export default Home;
