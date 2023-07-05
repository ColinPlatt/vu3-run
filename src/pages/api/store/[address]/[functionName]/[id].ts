import { NextApiRequest, NextApiResponse } from 'next';

interface Store {
  [key: string]: string;
}

export const store: Store = {};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { address, functionName, id } = req.query;

  if (req.method === 'POST') {
    const uniqueKey = `${address}-${functionName}-${id}`;
    store[uniqueKey] = req.body.data;
    res.status(200).json({ id: uniqueKey });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
