import React from 'react';
import Layout from '@components/layout';
import Container from '@components/container';
import PostList from '@components/postlist';
import { serachLocalPost } from '@lib/api/local_api';

type Props = {
  posts: any;
  post: any[];
};

const LabelPage = ({ posts, post }: Props) => {
  const [dataPost, setDataPost] = React.useState<any[]>([]);
  const [nextPage, setNextPage] = React.useState<string>('');

  React.useEffect(() => {
    setDataPost(post);
    setNextPage(posts?.nextPageToken || '');
  }, [posts, post]);

  const loadMore = () => {
    return new Promise<void>((resolve, reject) => {
      const params = { 'fetchBodies': true, 'pageToken': nextPage };
      serachLocalPost(params).then(res => {
        if (res.data.nextPageToken !== undefined) {
          setNextPage(res.data.nextPageToken);
        } else {
          setNextPage('');
        }
        setDataPost([...dataPost, ...res.data.items]);
        resolve();
      }).catch(reject);
    });
  };

  return (
    <>
      <Layout>
        <Container>
          <h1 className="text-3xl font-semibold tracking-tight text-center lg:leading-snug text-brand-primary lg:text-4xl dark:text-white">
            Archive
          </h1>
          <div className="text-center">
            <p className="mt-2 text-lg">
              See all posts we have ever written.
            </p>
          </div>
          <div className="grid gap-10 mt-10 lg:gap-10 md:grid-cols-2 xl:grid-cols-3 ">
            {dataPost.map((post: any, index: any) => {
              const images = [{
                url: post?.content?.slice(post?.content?.indexOf('src')).split('"')[1]
              }];
              const data = { ...post, images: images };
              return (
                <PostList
                  key={index}
                  post={data}
                  aspect="square"
                />
              );
            })}
          </div>
          {/* load more button */}
          {nextPage !== '' && (
            <div className="flex justify-center mt-10">
              <button
                className="bg-gray-900 dark:bg-zinc-50 rounded dark:text-black text-white font-bold py-2 px-4 rounded"
                onClick={loadMore}
              >
                Load more
              </button>
            </div>
          )}
        </Container>
      </Layout>
    </>
  );
};

export default LabelPage;