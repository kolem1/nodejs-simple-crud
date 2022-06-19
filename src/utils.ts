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
        try {
          const requestBody = JSON.parse(body || '{}');
          resolve(requestBody);
        } catch {
          reject();
        }
      });
  });
}

export function handleServerError(res: ServerResponse) {
  res.writeHead(500, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message: 'Something went wrong' }));
}
