import { useRecoilValue, useResetRecoilState } from 'recoil';
import { Link, useNavigate } from 'react-router-dom';
import { diaryListState } from '../../recoil/diary';
import { userState } from '../../recoil/user';
import { DefaultIcon } from '../../assets';

import styles from './header.module.scss';

const Header = () => {
  const userInfo = useRecoilValue(userState);
  const userInfoReset = useResetRecoilState(userState);
  const diaryListReset = useResetRecoilState(diaryListState);
  const navigate = useNavigate();

  const localStorageItem = localStorage.getItem('id');

  const signHandler = () => {
    if (localStorageItem) {
      localStorage.removeItem('id');
      userInfoReset();
      diaryListReset();
      navigate('/');
      return;
    }
    navigate('/signin');
  };

  return (
    <header className={styles.header}>
      <div className={styles.divBox}>
        <Link to='/' className={styles.homeLink}>
          Home
        </Link>
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
