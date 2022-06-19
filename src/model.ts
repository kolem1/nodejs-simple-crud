import { v4 as uuidv4 } from 'uuid';

export interface IUser {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
}

export type ReceivedUser = Omit<IUser, 'id'>;

let users: IUser[] = [];

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

export const deleteUser = async (userId: string) => {
  const user = await getUser(userId);

  if (user) {
    users = users.filter(({ id }) => id !== userId);
    return true;
  }

  return false;
};

export const editUser = async (userId: string, user: Partial<IUser>) => {
  const index = users.findIndex(({ id }) => id === userId);
  if (index === -1) {
    return Promise.resolve(null);
  }

  const prevUser = users[index];

  const newUser: IUser = {
    id: prevUser.id,
    username: user.username ?? prevUser.username,
    age: user.age ?? prevUser.age,
    hobbies: user.hobbies ?? prevUser.hobbies,
  };

  users[index] = newUser;

  return Promise.resolve(newUser);
};
