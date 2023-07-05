
import { NextApiRequest, NextApiResponse } from 'next';
import { store } from 'src/pages/api/store/[address]/[functionName]/[id]';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { address, functionName, id } = req.query;

  if (req.method === 'GET') {
    const uniqueKey = `${address}-${functionName}-${id}`;
    const data = store[uniqueKey];
    if (data) {
      delete store[uniqueKey];
      res.status(200).send(data);
    } else {
      res.status(404).end('Not Found');
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
