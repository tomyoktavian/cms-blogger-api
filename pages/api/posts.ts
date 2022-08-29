// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { getBlogsList } from '@lib/api/blogs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { data } = await getBlogsList(req.query).then(res => res);
    res.status(200).json(data);
  } catch (error: any) {
    res.status(error.code).json(error);
  }
}
