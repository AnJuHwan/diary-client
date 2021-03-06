import axios from 'axios';
import { IDiary, IDiaryList } from '../types/diary';
import { BASEURL } from '../utils/baseURL';

interface IPostParams {
  userId: string;
  title: string;
  content: string;
  postImage: string;
  sharePost: string;
  date: string;
  writer: string;
}

interface IEditParams {
  id: string;
  title: string;
  content: string;
  postImage: string;
  sharePost: string;
  date: string;
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

export const getPublicDiary = async () => {
  try {
    const response = await axios.get<IDiaryList>(`${BASEURL}/post/public/get`);
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

export const editDiary = async (editParams: IEditParams) => {
  try {
    const response = await axios.put<IDiaryList>(`${BASEURL}/post/edit`, editParams);
    const { data } = response;
    return data;
  } catch (error) {
    throw new Error('server Error');
  }
};
