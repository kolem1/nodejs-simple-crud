import { IncomingMessage, ServerResponse } from 'http';

export function parseBody<T>(req: IncomingMessage): Promise<T> {
  return new Promise((resolve, reject) => {
    let body = '';
    req
      .on('error', err => {
        console.error(err);
        reject();
      })
      .on('data', chunk => {
        body += chunk;
      })
      .on('end', () => {
        resolve(JSON.parse(body || '{}'));
        reject();
      });
  });
}

export function handleServerError(res: ServerResponse) {
  res.writeHead(500, { 'Content-Type': 'application/json' });
  res.write(JSON.stringify({ message: 'Something went wrong' }));
  res.end();
}
