import request from '@utils/request';

// https://www.googleapis.com/blogger/v3/blogs/5851741928033295707/posts?fields=nextPageToken,items(id,title,location(name,lat,lng),url,content,labels,published,updated,images,author(displayName,image),replies(totalItems))&fetchImages=true&fetchBodies=true&key=AIzaSyAcnifSirW7-k28f6AE1ZUJofl9VXskrV0
export const blogs = (params?: any) => {
  return request({
    url: `?fields=name,description,posts(totalItems),pages(totalItems),locale`,
    method: 'get',
    params
  });
};

export const getPostsUrl = (params?: any) => {
  return request({
    url: `/posts?fields=items(url)`,
    method: 'get',
    params
  });
};

export const getPosts = (params?: any) => {
  return request({
    url: `/posts?fields=nextPageToken,items(id,title,location(name,lat,lng),url,content,labels,published,updated,images,author(displayName,image),replies(totalItems))`,
    method: 'get',
    params
  });
};

export const serachPosts = (params?: any) => {
  return request({
    url: `/posts/search?fields=nextPageToken,items(id,title,location(name,lat,lng),url,content,labels,published,updated,images,author(displayName,image),replies(totalItems))`,
    method: 'get',
    params
  });
};

export const getPost = (id: string, params?: any) => {
  return request({
    url: `/posts/${id}?fiealds=id,title,location(name,lat,lng),url,content,labels,published,updated,images,author(displayName,image),replies(totalItems)&fetchImages=true`,
    method: 'get',
    params
  });
};

export const getPostWithPath = (path: string, params?: any) => {
  return request({
    url: `/posts/bypath?path=${path}`,
    method: 'get',
    params
  });
};