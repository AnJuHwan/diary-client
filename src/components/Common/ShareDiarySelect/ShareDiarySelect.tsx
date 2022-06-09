import { ChangeEvent } from 'react';
import { useSetRecoilState } from 'recoil';
import { diaryPublicState } from '../../../recoil/diary';

const ShareDiarySelect = () => {
  const setValue = useSetRecoilState(diaryPublicState);

  const selectChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value);
  };

  return (
    <select onChange={selectChangeHandler}>
      <option value='private'>비공개</option>
      <option value='public'>공개</option>
    </select>
  );
};

export default ShareDiarySelect;
