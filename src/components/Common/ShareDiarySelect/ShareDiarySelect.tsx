import { ChangeEvent, useEffect } from 'react';
import { useResetRecoilState, useSetRecoilState } from 'recoil';
import { diaryPublicState } from '../../../recoil/diary';
import styles from './shareDiaryselect.module.scss';

const ShareDiarySelect = () => {
  const resetValue = useResetRecoilState(diaryPublicState);
  const setValue = useSetRecoilState(diaryPublicState);

  const selectChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    resetValue();
  }, [resetValue]);

  return (
    <select className={styles.selectBar} onChange={selectChangeHandler}>
      <option value='private'>비공개</option>
      <option value='public'>공개</option>
    </select>
  );
};

export default ShareDiarySelect;
