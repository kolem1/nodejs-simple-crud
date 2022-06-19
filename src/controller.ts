import { IncomingMessage, ServerResponse } from 'http';
import * as UsersModel from './model';
import { parseBody } from './utils';

type ControllerFunction = (req: IncomingMessage, res: ServerResponse) => Promise<void>;

export const getUsers: ControllerFunction = async (_, res) => {
  const users = await UsersModel.getUsers();
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.write(JSON.stringify(users));

  res.end();
};

export const addUser: ControllerFunction = async (req, res) => {
  const { username, age, hobbies } = await parseBody<UsersModel.ReceivedUser>(req);
  if (username === undefined || age === undefined || hobbies === undefined) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify({ message: 'Fields username, age and hobbies are required' }));
    res.end();
    return;
  }

  const newUser = await UsersModel.addUser({ username, age, hobbies });

  res.writeHead(201, { 'Content-Type': 'application/json' });
  res.write(JSON.stringify(newUser));
  res.end();
};
