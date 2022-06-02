import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import Loading from '../../components/Common/Loading/Loading';
import Modal from '../../components/Common/Modal/Modal';
import Input from '../../components/Sign/Input/Input';
import { useChangeInput } from '../../hooks/useChangeInput';
import { userState } from '../../recoil/user';
import { isIdChecked, isNicknameChecked, userSignup } from '../../services/sign';
import { cx } from '../../styles';
import styles from './signup.module.scss';

const Signup = () => {
  const setUser = useSetRecoilState(userState);

  const [isIdCheckData, setIsIdCheckData] = useState(false);
  const [idError, setIdError] = useState('');
  const [isNicknameCheckData, setIsNicknameCheckData] = useState(false);
  const [nicknameError, setNicknameError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);

  const navigate = useNavigate();
  const idInput = useChangeInput('');
  const nicknameInput = useChangeInput('');
  const passwordInput = useChangeInput('');
  const passwordConfirmInput = useChangeInput('');

  const isPasswordValue = passwordInput.state.trim().length !== 0 && passwordConfirmInput.state.trim().length !== 0;
  const sigupValidation =
    isIdCheckData &&
    isNicknameCheckData &&
    isPasswordValue &&
    passwordInput.state === passwordConfirmInput.state &&
    passwordInput.state.length > 6;

  const signupClickHandler = async () => {
    try {
      setIsLoading(true);
      if (sigupValidation) {
        const signup = await userSignup({
          email: idInput.state,
          password: passwordInput.state,
          nickName: nicknameInput.state,
          profile: '',
        });
        const { email, nickName, profile, _id } = signup.user;
        if (signup.success) {
          setUser({ email, nickName, profile, _id });
          localStorage.setItem('id', _id);
          navigate('/');
        }
        return;
      }
    } catch (error) {
      setVisibleModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  const isIdCheckBlurHandler = async () => {
    try {
      const idCheck = await isIdChecked(idInput.state);
      setIsIdCheckData(idCheck.success);
      setIdError('');
    } catch (error: any) {
      setIsIdCheckData(false);
      setIdError('이미 가입되어있는 아이디가 있습니다.');
    }
  };

  const isNicknameCheckBlurHandler = async () => {
    try {
      const nicknameCheck = await isNicknameChecked(nicknameInput.state);
      setIsNicknameCheckData(nicknameCheck.success);
      setNicknameError('');
    } catch (error: any) {
      setIsNicknameCheckData(false);
      setNicknameError('이미 가입되어있는 닉네임가 있습니다.');
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.signContainer}>
        <h1>Sign Up</h1>
        <form className={styles.form}>
          <Input
            placeholder='아이디'
            type='text'
            title='ID'
            id='id'
            value={idInput.state}
            isError={idError}
            onChange={idInput.stateChangeHandler}
            onBlur={isIdCheckBlurHandler}
          />

          <Input
            placeholder='닉네임'
            type='text'
            title='NickName'
            id='nickname'
            value={nicknameInput.state}
            isError={nicknameError}
            onChange={nicknameInput.stateChangeHandler}
            onBlur={isNicknameCheckBlurHandler}
          />

          <Input
            placeholder='비밀번호'
            type='password'
            title='Password'
            id='password'
            value={passwordInput.state}
            onChange={passwordInput.stateChangeHandler}
            icon
          />
          <Input
            placeholder='비밀번호 확인'
            type='password'
            title='Password Confirm'
            id='confirm'
            value={passwordConfirmInput.state}
            onChange={passwordConfirmInput.stateChangeHandler}
            icon
          />

          <button
            type='button'
            className={cx(styles.signup, { [styles.active]: sigupValidation })}
            onClick={signupClickHandler}
          >
            Sign Up
          </button>
          {isLoading && <Loading />}
          {visibleModal && (
            <Modal title='회원가입 실패' desc='가입양식 확인바랍니다.' setVisibleModal={setVisibleModal} />
          )}
        </form>
      </div>
    </div>
  );
};

export default Signup;
