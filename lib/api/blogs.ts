import request from '@utils/request';

export const getBlogsList = (params?: any) => {
  return request({
    url: `/posts`,
    method: 'get',
    params
  });
};

export const getBlog = (id: string, params?: any) => {
  return request({
    url: `/posts/${id}?fetchImages=true`,
    method: 'get',
    params
  });
};

export const getBlogWithPath = (path: string, params?: any) => {
  return request({
    url: `/posts/bypath?fetchImages=true&path=${path}`,
    method: 'get',
    params
  });
};