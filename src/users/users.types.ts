export type UserResponse = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
};

export type UsersResponse = {
  data: UserResponse[];
};
