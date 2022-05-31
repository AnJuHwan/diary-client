import { IDiary } from '../types/diary';
import { atom } from 'recoil';

export const diaryListState = atom<IDiary[]>({
  key: '#diaryListState',
  default: [],
});
