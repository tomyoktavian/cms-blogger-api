import request from '@utils/request';

export const blogs = (params?: any) => {
  return request({
    url: `?key=${process.env.BLOGGER_API_KEY}`,
    method: 'get',
    params
  });
};

export const getPosts = (params?: any) => {
  return request({
    url: `/posts`,
    method: 'get',
    params
  });
};

export const getPost = (id: string, params?: any) => {
  return request({
    url: `/posts/${id}?fetchImages=true`,
    method: 'get',
    params
  });
};

export const getPostWithPath = (path: string, params?: any) => {
  return request({
    url: `/posts/bypath?fetchImages=true&path=${path}`,
    method: 'get',
    params
  });
};