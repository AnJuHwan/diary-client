import React from 'react';
import { Outlet } from 'react-router-dom';
import styles from './signLayout.module.scss';

const SignLayout = () => {
  return (
    <div className={styles.app}>
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
};

export default SignLayout;
