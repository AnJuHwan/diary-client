export interface IIsCheck {
  success: boolean;
  message: string;
}

export interface ISign {
  success: boolean;
  user: {
    email: string;
    password: string;
    nickName: string;
    profile: string;
    _id: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
}

export interface IUser {
  email: string;
  nickName: string;
  profile: string;
  _id: string;
}
