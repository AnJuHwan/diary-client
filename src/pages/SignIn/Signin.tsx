import React from 'react';
import styles from './signin.module.scss';

const Signin = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.signContainer}>
        <h1>LOG IN</h1>
        <form className={styles.form}>
          <div className={styles.inputBox}>
            <label htmlFor='id'>ID</label>
            <input type='text' id='id' />
          </div>
          <div className={styles.inputBox}>
            <label htmlFor='password'>Password</label>
            <input type='password' id='password' />
          </div>
          <button type='button'>Log In</button>
        </form>
      </div>
    </div>
  );
};

export default Signin;
