import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import { DefaultIcon, SearchIcon } from '../../assets';
import { useChangeInput } from '../../hooks/useChangeInput';
import useDebounce from '../../hooks/useDebounce';
import { diaryFilterListState, diaryListState } from '../../recoil/diary';
import { userState } from '../../recoil/user';

import styles from './header.module.scss';

const Header = () => {
  const userInfo = useRecoilValue(userState);
  const diaryList = useRecoilValue(diaryListState);
  const diaryFilterList = useSetRecoilState(diaryFilterListState);
  const userInfoReset = useResetRecoilState(userState);
  const diaryListReset = useResetRecoilState(diaryListState);
  const { state, stateChangeHandler } = useChangeInput('');
  const localStorageItem = localStorage.getItem('id');
  const debounce = useDebounce(state);
  const navigate = useNavigate();

  useEffect(() => {
    const filterList = diaryList.filter((item) => item.title === state);
    diaryFilterList(filterList);
  }, [debounce, diaryFilterList, diaryList, state]);

  const signHandler = () => {
    if (localStorageItem) {
      localStorage.removeItem('id');
      userInfoReset();
      diaryListReset();
      return;
    }
    navigate('/signin');
  };

  return (
    <header className={styles.header}>
      <div className={styles.divBox}>
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

        <div className={styles.profileBox}>
          <DefaultIcon />
          {localStorageItem && <span>{userInfo.nickName} 님</span>}
          <button type='button' onClick={signHandler}>
            {localStorageItem ? '로그아웃' : '로그인'}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
