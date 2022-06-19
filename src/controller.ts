import { IncomingMessage, ServerResponse } from 'http';
import { validate as validateUuid } from 'uuid';
import * as UsersModel from './model';
import { parseBody } from './utils';

type ControllerFunction = (req: IncomingMessage, res: ServerResponse) => Promise<void>;

export const getUsers: ControllerFunction = async (_, res) => {
  const users = await UsersModel.getUsers();
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(users));
};

export const getUser: ControllerFunction = async (req, res) => {
  const id = req.url?.split('/')[2];

  if (!id || !validateUuid(id)) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'User id is invalid' }));
    return;
  }

  const user = await UsersModel.getUser(id);

  if (!user) {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'User is not found' }));
    return;
  }

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(user));
};

export const addUser: ControllerFunction = async (req, res) => {
  const { username, age, hobbies } = await parseBody<UsersModel.ReceivedUser>(req);
  if (username === undefined || age === undefined || hobbies === undefined) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Fields username, age and hobbies are required' }));
    return;
  }

  const newUser = await UsersModel.addUser({ username, age, hobbies });

  res.writeHead(201, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(newUser));
};

export const deleteUser: ControllerFunction = async (req, res) => {
  const id = req.url?.split('/')[2];

  if (!id || !validateUuid(id)) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'User id is invalid' }));
    return;
  }

  const isDeleted = await UsersModel.deleteUser(id);

  if (isDeleted) {
    res.statusCode = 204;
    res.end();
    return;
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message: 'User is not found' }));
};

export const editUser: ControllerFunction = async (req, res) => {
  const id = req.url?.split('/')[2];

  if (!id || !validateUuid(id)) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'User id is invalid' }));
    return;
  }

  const receivedUser = await parseBody<Partial<UsersModel.IUser>>(req);
  const editedUser = await UsersModel.editUser(id, receivedUser);

  if (!editedUser) {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'User is not found' }));
    return;
  }

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(editedUser));
};
