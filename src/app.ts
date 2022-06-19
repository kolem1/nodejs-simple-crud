import http from 'http';

const server = http.createServer((req, res) => {
  console.log('received');
  res.end();
});

const PORT = 4000;

server.listen(PORT);
console.log(`Server is running on port: ${PORT}`);
