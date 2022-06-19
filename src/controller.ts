import { IncomingMessage, ServerResponse } from 'http';
import * as UsersModel from './model';

type ControllerFunction = (req: IncomingMessage, res: ServerResponse) => Promise<void>;

export const getUsers: ControllerFunction = async (_, res) => {
  const users = await UsersModel.getUsers();
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.write(JSON.stringify(users));

  res.end();
};
