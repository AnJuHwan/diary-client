import Home from '../../pages/Home/Home';
import styles from './layout.module.scss';

const Layout = () => {
  return (
    <div className={styles.app}>
      <Home />
    </div>
  );
};

export default Layout;
