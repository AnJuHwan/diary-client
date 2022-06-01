import axios from 'axios';
import { IDiary, IDiaryList } from '../types/diary';
import { BASEURL } from '../utils/baseURL';

interface IPostParams {
  userId: string;
  title: string;
  content: string;
}

export const getMyDiary = async (id: string) => {
  try {
    const response = await axios.get<IDiaryList>(`${BASEURL}/post/${id}`);
    const { data } = response;
    const { postItem } = data;
    const newArray: IDiary[] = [];
    if (!postItem) return null;

    return newArray.concat(postItem);
  } catch (error) {
    throw new Error('server Error');
  }
};

export const uploadDiary = async (params: IPostParams) => {
  try {
    const response = await axios.post<IDiaryList>(`${BASEURL}/post/upload`, params);
    const { data } = response;
    return data;
  } catch (error) {
    throw new Error('server Error');
  }
};

export const getDetailDiary = async (id: string) => {
  try {
    const response = await axios.get<IDiaryList>(`${BASEURL}/post/detail/${id}`);
    const { data } = response;
    return data;
  } catch (error) {
    throw new Error('server Error');
  }
};

export const deleteDiary = async (id: string) => {
  try {
    const response = await axios.delete<IDiaryList>(`${BASEURL}/post/${id}`);
    const { data } = response;
    return data;
  } catch (error) {
    throw new Error('server Error');
  }
};
