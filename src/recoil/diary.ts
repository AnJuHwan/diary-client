import { IDetailData, IDiary } from '../types/diary';
import { atom } from 'recoil';

export const diaryListState = atom<IDiary[]>({
  key: '#diaryListState',
  default: [],
});

export const diaryFilterListState = atom<IDiary[]>({
  key: '#diaryFilterListState',
  default: [],
});

export const diaryDetailState = atom<IDetailData>({
  key: '#diaryEditInputValueState',
  default: { title: '', content: '', id: '', userId: '', postImage: '', sharePost: '', date: '' },
});

export const diaryPublicState = atom<string>({
  key: '#diaryPublicState',
  default: 'private',
});
