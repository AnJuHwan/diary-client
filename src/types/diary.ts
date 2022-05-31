export interface IDiaryList {
  postItem: IDiary[];
}

export interface IDiary {
  _id: string;
  userId: string;
  title: string;
  content: string;
}
