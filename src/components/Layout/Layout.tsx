import { Outlet } from 'react-router-dom';
import styles from './layout.module.scss';

const Layout = () => {
  return (
    <div className={styles.app}>
      <div className={styles.main}>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
