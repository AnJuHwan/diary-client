import { IDiary } from '../types/diary';
import { atom } from 'recoil';

export const diaryListState = atom<IDiary[]>({
  key: '#diaryListState',
  default: [],
});

export const diaryFilterListState = atom<IDiary[]>({
  key: '#diaryFilterListState',
  default: [],
});
