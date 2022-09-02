import localRequest from 'utils/local-request';

export const getLocalPosts = (params?: any) => {
  return localRequest({
    url: `/api/posts`,
    method: 'get',
    params
  });
};

export const serachLocalPost = (params?: any) => {
  return localRequest({
    url: `/api/search`,
    method: 'get',
    params
  });
};