import request from '@utils/request';

export const getBlogsList = (params?: any) => {
  return request({
    url: `/posts?key=${process.env.BLOGGER_API_KEY}`,
    method: 'get',
    params
  });
};

export const getBlog = (id: string, params?: any) => {
  return request({
    url: `/posts/${id}?fetchImages=true&key=${process.env.BLOGGER_API_KEY}`,
    method: 'get',
    params
  });
};

export const getBlogWithPath = (path: string, params?: any) => {
  return request({
    url: `/posts/bypath?fetchImages=true&path=${path}&key=${process.env.BLOGGER_API_KEY}`,
    method: 'get',
    params
  });
};