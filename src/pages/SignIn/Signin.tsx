import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { cx } from '../../styles';
import { useChangeInput } from '../../hooks/useChangeInput';
import { userState } from '../../recoil/user';
import { userSignin } from '../../services/sign';
import Modal from '../../components/Common/Modal/Modal';
import Input from '../../components/Sign/Input/Input';
import Loading from '../../components/Common/Loading/Loading';
import styles from './signin.module.scss';

const Signin = () => {
  const setUser = useSetRecoilState(userState);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [visibleModal, setVisibleModal] = useState(false);
  const navigate = useNavigate();
  const idInput = useChangeInput('');
  const passwordInput = useChangeInput('');
  const signInValidation = idInput.state.trim().length !== 0 && passwordInput.state.trim().length !== 0;

  const signinClickHandler = async () => {
    setErrorMessage('');
    try {
      setIsLoading(true);
      if (signInValidation) {
        const signin = await userSignin({ email: idInput.state, password: passwordInput.state });
        const { email, nickName, profile, _id } = signin.user;
        if (signin.success) {
          setUser({ email, nickName, profile, _id });
          localStorage.setItem('id', _id);
          navigate('/');
        }
        return;
      }
    } catch (error: any) {
      setVisibleModal(true);
      setErrorMessage('아이디 or 비밀번호 확인해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.signContainer}>
        <h1>LOG IN</h1>
        <form className={styles.form}>
          <Input
            placeholder='아이디를 입력해주세요.'
            type='text'
            title='ID'
            id='id'
            value={idInput.state}
            onChange={idInput.stateChangeHandler}
          />
          <Input
            placeholder='비밀번호을 입력해주세요.'
            type='password'
            title='Password'
            id='password'
            value={passwordInput.state}
            onChange={passwordInput.stateChangeHandler}
            icon
          />
          <button
            type='button'
            className={cx(styles.signin, { [styles.active]: signInValidation })}
            onClick={signinClickHandler}
          >
            Log In
          </button>
          <Link to='/signup' className={styles.signupLink}>
            Sign up
          </Link>
          {isLoading && <Loading />}
        </form>
      </div>
      {visibleModal && <Modal title='로그인 실패' desc={errorMessage} setVisibleModal={setVisibleModal} />}
    </div>
  );
};

export default Signin;
