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
        <div>
          <Link to='/' className={styles.homeLink}>
            Home
          </Link>
          <Link to='/public' className={styles.homeLink}>
            Public Diary
          </Link>
        </div>
        <div className={styles.profileBox}>
          {userInfo.profile ? <img className={styles.profile} src={userInfo.profile} alt='profile' /> : <DefaultIcon />}
          {localStorageItem && <span>{userInfo.nickName} 님</span>}
          <Link to='/my'>회원정보변경</Link>
          <button type='button' onClick={signHandler}>
            {localStorageItem ? '로그아웃' : '로그인'}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
