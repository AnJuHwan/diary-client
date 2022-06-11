import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { diaryFilterListState, diaryListState } from '../../recoil/diary';
import { getPublicDiary } from '../../services/diary';
import { useChangeInput } from '../../hooks/useChangeInput';
import useDebounce from '../../hooks/useDebounce';
import { SearchIcon } from '../../assets';
import MainContainer from '../../components/Common/MainContainer/MainContainer';
import ContentContainer from '../../components/Home/ContentContainer/ContentContainer';
import styles from './publicDiary.module.scss';
import Loading from '../../components/Common/Loading/Loading';

const PublicDiary = () => {
  const diaryFilterList = useSetRecoilState(diaryFilterListState);
  const [diary, setDiary] = useRecoilState(diaryListState);
  const [isLoading, setIsLoading] = useState(false);
  const { state, stateChangeHandler } = useChangeInput('');
  const debounce = useDebounce(state);

  useEffect(() => {
    const filterList = diary.filter((item) => item.title === state);
    diaryFilterList(filterList);
  }, [debounce, diaryFilterList, diary, state]);

  useEffect(() => {
    const getDiaryData = async () => {
      setIsLoading(true);
      try {
        const diaryDatas = await getPublicDiary();
        if (!diaryDatas) return;
        setDiary(diaryDatas);
      } catch (error) {
        throw new Error('서버에러');
      } finally {
        setIsLoading(false);
      }
    };
    getDiaryData();
  }, [setDiary]);

  return (
    <>
      <MainContainer>
        <div className={styles.titleBox}>
          <div className={styles.diaryTop}>
            <span>Public Diary</span>
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

export default PublicDiary;
