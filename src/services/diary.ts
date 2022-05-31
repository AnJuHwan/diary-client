import axios from 'axios';
import { IDiary, IDiaryList } from '../types/diary';
import { BASEURL } from '../utils/baseURL';

export const getMyDiary = async (id: string) => {
  try {
    const response = await axios.get<IDiaryList>(`${BASEURL}/post/${id}`);
    const { data } = response;
    const { postItem } = data;
    const newArray: IDiary[] = [];
    return newArray.concat(postItem);
  } catch (error) {
    throw new Error('server Error');
  }
};
