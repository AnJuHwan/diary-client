import { Outlet } from 'react-router-dom';
import styles from './signLayout.module.scss';

const SignLayout = () => {
  return (
    <div className={styles.app}>
      <div className={styles.rightWrap}>
        <Outlet />
      </div>
    </div>
  );
};

export default SignLayout;
