import { v4 as uuidv4 } from 'uuid';

interface IUser {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
}

export type ReceivedUser = Omit<IUser, 'id'>;

const users: IUser[] = [];

export const getUsers = () => {
  return Promise.resolve(users);
};

export const getUser = (userId: string) => {
  const user = users.find(({ id }) => id === userId);

  return Promise.resolve(user);
};

export const addUser = (user: ReceivedUser) => {
  const newUser: IUser = { id: uuidv4(), ...user };

  users.push(newUser);

  return Promise.resolve(newUser);
};
