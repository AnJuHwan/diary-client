import React, { useState } from 'react';
import styles from './signup.module.scss';

const Signup = () => {
  const [id, setId] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  return (
    <div className={styles.wrapper}>
      <div className={styles.signContainer}>
        <h1>Sign Up</h1>
        <form className={styles.form}>
          <div className={styles.inputBox}>
            <label htmlFor='id'>ID</label>
            <input type='text' id='id' onBlur={() => console.log('blur')} />
          </div>

          <div className={styles.inputBox}>
            <label htmlFor='nickname'>Nickname</label>
            <input type='text' id='nickname' onBlur={() => console.log('blur')} />
          </div>

          <div className={styles.inputBox}>
            <label htmlFor='password'>Password</label>
            <input type='password' id='password' />
          </div>
          <div className={styles.inputBox}>
            <label htmlFor='confirm'>Password Confirm</label>
            <input type='password' id='confirm' />
          </div>

          <button type='button' className={styles.signup}>
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
