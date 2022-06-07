import { useRecoilValue } from 'recoil';
import MainContainer from '../../components/Common/MainContainer/MainContainer';
import UserInfoBox from '../../components/MyPage/UserInfoBox/UserInfoBox';
import { userState } from '../../recoil/user';
import styles from './myPage.module.scss';

const MyPage = () => {
  const userValue = useRecoilValue(userState);

  return (
    <MainContainer>
      {/* <h1>Profile</h1> */}
      <div className={styles.inputWrap}>
        <UserInfoBox userValue={userValue.nickName} category='Nickname' />
        <UserInfoBox userValue={userValue.profile} category='Image' />
        <UserInfoBox userValue={userValue.email} category='Email' />
        <UserInfoBox userValue='' category='Password' />
      </div>
    </MainContainer>
  );
};

export default MyPage;
