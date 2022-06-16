import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { diaryFilterListState, diaryListState } from '../../recoil/diary';
import { getMyDiary } from '../../services/diary';
import styles from './home.module.scss';
import { SearchIcon } from '../../assets';
import { useChangeInput } from '../../hooks/useChangeInput';
import useDebounce from '../../hooks/useDebounce';
import ContentContainer from '../../components/Home/ContentContainer/ContentContainer';
import MainContainer from '../../components/Common/MainContainer/MainContainer';
import Loading from '../../components/Common/Loading/Loading';

const Home = () => {
  const [diary, setDiary] = useRecoilState(diaryListState);
  const diaryFilterList = useSetRecoilState(diaryFilterListState);
  const [isLoading, setIsLoading] = useState(false);
  const { state, stateChangeHandler } = useChangeInput('');
  const debounce = useDebounce(state);
  const localStorageId = localStorage.getItem('id');

  useEffect(() => {
    const filterList = diary.filter((item) => item.title.includes(state));
    diaryFilterList(filterList);
  }, [debounce, diaryFilterList, diary, state]);

  useEffect(() => {
    const getDiaryData = async () => {
      try {
        setIsLoading(true);
        if (localStorageId) {
          const diaryDatas = await getMyDiary(localStorageId);
          if (!diaryDatas) return;
          setDiary(diaryDatas);
        }
      } catch (error) {
        throw new Error('서버에러');
      } finally {
        setIsLoading(false);
      }
    };
    getDiaryData();
  }, [localStorageId, setDiary]);

  return (
    <>
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
      {isLoading && <Loading />}
    </>
  );
};

export default Home;
