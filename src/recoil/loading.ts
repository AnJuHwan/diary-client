import { atom } from 'recoil';

export const imageLoading = atom<boolean>({
  key: '#imageLoading',
  default: false,
});
