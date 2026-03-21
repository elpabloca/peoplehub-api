export type UserReqres = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
};

export type UserReqresResponse = {
  data: UserReqres;
};

export type UsersReqresResponse = {
  data: UserReqres[];
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  token: string;
};
