// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { getPosts } from '@lib/api/blogger_api_v3';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { data } = await getPosts(req.query).then(res => res);
    const newItems = data.items.map((item: any) => {
      const path = new URL(item.url);
      return { ...item, url: path.pathname };
    });
    res.status(200).json({ ...data, items: newItems });
  } catch (error: any) {
    res.status(error.code).json(error);
  }
}
