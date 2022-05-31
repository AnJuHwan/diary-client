import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { userState } from '../../recoil/user';
import { userInfo } from '../../services/sign';

import Aside from '../Aside/Aside';
import Header from '../Header/Header';

import styles from './layout.module.scss';

const Layout = () => {
  const localStorageId = localStorage.getItem('id');
  const setUser = useSetRecoilState(userState);

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
      {/* <Aside /> */}
      <main className={styles.main}>
        <Header />

        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
