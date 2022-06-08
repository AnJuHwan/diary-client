import { useState } from 'react';
import styles from './userInfoBox.module.scss';
import InfoChange from '../../Common/Modal/InfoChange/InfoChange';

interface IProps {
  userValue: string;
  category: string;
}

const UserInfoBox = ({ userValue, category }: IProps) => {
  const [visibleModal, setVisivleModal] = useState(false);

  const closeModalHandler = () => {
    setVisivleModal(false);
  };

  return (
    <div className={styles.inputBox}>
      <p className={styles.category}>{category}</p>
      <p className={styles.desc}>회원정보 변경하시려면 밑에 박스를 클릭해주세요.</p>
      <button type='button' onClick={() => setVisivleModal(true)}>
        {userValue}
      </button>

      {visibleModal && <InfoChange category={category} userValue={userValue} setVisibleModal={closeModalHandler} />}
    </div>
  );
};

export default UserInfoBox;
