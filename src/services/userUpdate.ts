import { ISign } from '../types/sign';
import axios from 'axios';

export const userNicknameUpdate = async (id: string, nickname: string) => {
  try {
    const response = await axios.put<ISign>(`https://wanted-jh.herokuapp.com/users/update/nickname`, {
      id,
      nickName: nickname,
    });
    const { data } = response;
    return data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};
