import type { NextApiRequest, NextApiResponse } from 'next';
import { serachPosts, getPosts } from '@lib/api/blogger_api_v3';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    let allData = {};
    let newItems = [];
    if (req.query?.q && req.query?.q !== '') {
      const { data } = await serachPosts(req.query).then(res => res);
      allData = data;
      newItems = data.items.map((item: any) => {
        const path = new URL(item.url);
        return { ...item, url: path.pathname };
      });
    } else {
      const { data } = await getPosts(req.query).then(res => res);
      allData = data;
      newItems = data.items.map((item: any) => {
        const path = new URL(item.url);
        return { ...item, url: path.pathname };
      });
    }
    res.status(200).json({ ...allData, items: newItems });
  } catch (error: any) {
    res.status(error.code).json(error);
  }
}
