import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userState } from '../../recoil/user';
import MainContainer from '../../components/Common/MainContainer/MainContainer';
import Modal from '../../components/Common/Modal/Modal';
import UserInfoBox from '../../components/MyPage/UserInfoBox/UserInfoBox';
import styles from './myPage.module.scss';

let timer: NodeJS.Timeout;
const MyPage = () => {
  const userValue = useRecoilValue(userState);
  const [visibleModal, setVisibleModal] = useState(false);
  const navigate = useNavigate();
  const localStorageId = localStorage.getItem('id');

  useEffect(() => {
    if (!localStorageId) {
      setVisibleModal(true);
      timer = setTimeout(() => {
        navigate('/signin');
      }, 1500);
    }
    return () => {
      setVisibleModal(false);
      clearTimeout(timer);
    };
  }, [localStorageId, navigate, setVisibleModal]);

  return (
    <MainContainer>
      {/* <h1>Profile</h1> */}
      <div className={styles.inputWrap}>
        <UserInfoBox userValue={userValue.nickName} category='Nickname' />
        <UserInfoBox userValue='' category='Password' />
        <UserInfoBox userValue={userValue.profile} category='Image' />
        {visibleModal && <Modal title='알림' desc='로그인 후 이용해주세요.' setVisibleModal={setVisibleModal} />}
      </div>
    </MainContainer>
  );
};

export default MyPage;
