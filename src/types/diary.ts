export interface IDiaryList {
  success: boolean;
  postItem: IDiary & IDiary[];
}

export interface IDiary {
  _id: string;
  userId: string;
  title: string;
  content: string;
}

export interface IDetailData {
  id: string;
  title: string;
  content: string;
  userId: string;
}
