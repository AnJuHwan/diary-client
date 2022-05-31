import React from 'react';
import { useRecoilValue } from 'recoil';
import { DefaultIcon } from '../../assets';
import { useChangeInput } from '../../hooks/useChangeInput';
import { userState } from '../../recoil/user';

import styles from './header.module.scss';

const Header = () => {
  const userInfo = useRecoilValue(userState);
  const { state, stateChangeHandler } = useChangeInput();
  const localStorageItem = localStorage.getItem('id');

  console.log(state);
  return (
    <header className={styles.header}>
      <div className={styles.inputBox}>
        <input id='search' type='text' value={state} onChange={stateChangeHandler} />
      </div>

      <div className={styles.profileBox}>
        <DefaultIcon />
        {localStorageItem && <span>{userInfo.nickName} 님</span>}
        <button type='button'>{localStorageItem ? '로그아웃' : '로그인'}</button>
      </div>
    </header>
  );
};

export default Header;
