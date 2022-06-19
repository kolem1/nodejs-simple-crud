interface IUser {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
}

const users: IUser[] = [];

export const getUsers = () => {
  return Promise.resolve(users);
};
