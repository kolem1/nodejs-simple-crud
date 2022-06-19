import http from 'http';
import * as UsersController from './controller';

const server = http.createServer((req, res) => {
  const { url, method } = req;
  if (url === '/users' && method === 'GET') {
    UsersController.getUsers(req, res);
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Route not found' }));
  }
});

const PORT = 4000;

server.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
