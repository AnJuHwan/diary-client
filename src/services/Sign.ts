import axios from 'axios';
import { IIsCheck, ISign } from '../types/sign';

const BASEURL = 'https://wanted-jh.herokuapp.com';

interface ISignUpPrams {
  email: string;
  password: string;
  nickName: string;
  profile: string;
}

interface ISignInParams {
  email: string;
  password: string;
}

export const isIdChecked = async (id: string): Promise<IIsCheck> => {
  try {
    const response = await axios.post<IIsCheck>(`${BASEURL}/users/signup/emailCheck`, {
      email: id,
    });
    const { data } = response;
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const isNicknameChecked = async (nickName: string): Promise<IIsCheck> => {
  try {
    const response = await axios.post<IIsCheck>(`${BASEURL}/users/signup/nickNameCheck`, {
      nickName,
    });
    const { data } = response;
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const userSignup = async (params: ISignUpPrams) => {
  try {
    const response = await axios.post<ISign>(`${BASEURL}/users/signup`, params);
    const { data } = response;
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const userSignin = async (params: ISignInParams) => {
  try {
    const response = await axios.post<ISign>(`${BASEURL}/users/login`, params);
    const { data } = response;
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const userInfo = async (id: string) => {
  try {
    const response = await axios.get<ISign>(`${BASEURL}/users/my?id=${id}`);
    const { data } = response;
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
