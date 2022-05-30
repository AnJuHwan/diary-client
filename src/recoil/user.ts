import { atom } from 'recoil';
import { IUser } from '../types/sign';

export const userState = atom<IUser>({
  key: '#userState',
  default: { email: '', nickName: '', profile: '', _id: '' },
});
