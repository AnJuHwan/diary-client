import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { userState } from '../../../recoil/user';
import { imageLoading } from '../../../recoil/loading';
import InfoChange from '../../Common/Modal/InfoChange/InfoChange';
import Loading from '../../Common/Loading/Loading';
import styles from './userInfoBox.module.scss';

interface IProps {
  userValue: string;
  category: string;
}

const UserInfoBox = ({ userValue, category }: IProps) => {
  const userInfo = useRecoilValue(userState);
  const isLoading = useRecoilValue(imageLoading);
  const [visibleModal, setVisivleModal] = useState(false);
  const [type, setType] = useState('');

  const closeModalHandler = () => {
    setVisivleModal(false);
  };

  const openModalHandler = () => {
    const typeValue = {
      Nickname: 'text',
      Password: 'password',
      Image: 'file',
    }[category];
    setType(typeValue!);
    setVisivleModal(true);
  };

  return (
    <div className={styles.inputBox}>
      <p className={styles.category}>{category}</p>
      <p className={styles.desc}>회원정보 변경하시려면 밑에 박스를 클릭해주세요.</p>
      <button type='button' onClick={openModalHandler}>
        {category === 'Image' && userInfo.profile ? (
          <img className={styles.profile} src={userInfo.profile} alt='userProfile' />
        ) : (
          userValue
        )}
      </button>
      {category === 'Image' && isLoading && <Loading />}

      {visibleModal && (
        <InfoChange type={type} category={category} userValue={userValue} setVisibleModal={closeModalHandler} />
      )}
    </div>
  );
};

export default UserInfoBox;
