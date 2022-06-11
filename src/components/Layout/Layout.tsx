import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { userState } from '../../recoil/user';
import { userInfo } from '../../services/sign';
import Header from '../Header/Header';
import styles from './layout.module.scss';

const Layout = () => {
  const setUser = useSetRecoilState(userState);
  const localStorageId = localStorage.getItem('id');

  useEffect(() => {
    const getUserData = async () => {
      if (!localStorageId) return;
      const myInfo = await userInfo(localStorageId);
      const { email, nickName, profile, _id } = myInfo.user;
      setUser({ email, nickName, profile, _id });
    };

    getUserData();
  }, [localStorageId, setUser]);

  return (
    <div className={styles.app}>
      <div className={styles.wrap}>
        <Header />
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
