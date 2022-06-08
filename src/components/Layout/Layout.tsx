import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { userState } from '../../recoil/user';
import { userInfo } from '../../services/sign';
import Header from '../Header/Header';
import styles from './layout.module.scss';

const Layout = () => {
  const localStorageId = localStorage.getItem('id');
  const [user, setUser] = useRecoilState(userState);

  useEffect(() => {
    const getUserData = async () => {
      if (!localStorageId) return;
      const myInfo = await userInfo(localStorageId);
      const { email, nickName, profile, _id } = myInfo.user;
      setUser({ email, nickName, profile, _id });
    };

    getUserData();
  }, [localStorageId, setUser, user]);

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
