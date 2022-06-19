import http from 'http';
import * as UsersController from './controller';
import { handleServerError } from './utils';

const server = http.createServer(async (req, res) => {
  const { url, method } = req;
  try {
    if (url === '/users' && method === 'GET') {
      await UsersController.getUsers(req, res);
    } else if (url === '/users' && method === 'POST') {
      await UsersController.addUser(req, res);
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Route not found' }));
    }
  } catch {
    handleServerError(res);
  }
});

const PORT = 4000;

server.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
