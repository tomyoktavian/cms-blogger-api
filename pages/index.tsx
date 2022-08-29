import React from 'react';
import type { NextPage } from 'next';
// import Head from 'next/head'
// import Image from 'next/image'
import Container from '@components/container';
import PostList from '@components/postlist';
import Layout from '@components/layout';
import type { GetServerSideProps } from 'next';
import absoluteUrl from 'next-absolute-url';
import axios from 'axios';

const Home: NextPage = ({ blog, posts }: any) => {
  const [dataPost, setDataPost] = React.useState<any[]>([]);
  const [nextPage, setNextPage] = React.useState<string>('');

  React.useEffect(() => {
    setDataPost(posts);
    setNextPage(blog.nextPageToken);
  }, [blog, posts]);

  const loadMore = () => {
    return new Promise<void>((resolve, reject) => {
      const params = { 'fetchImages': true, 'fetchBodies': false, 'pageToken': nextPage };
      axios.get('/api/posts', { params }).then((res: any) => {
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
    <Layout>
      <main>
        <Container>
          <div className="grid gap-10 lg:gap-10 md:grid-cols-2 ">
            {dataPost.slice(0, 2).map((post: any, index: any) => (
              <PostList
                key={index}
                post={post}
                aspect="landscape"
                preloadImage={true}
              />
            ))}
          </div>
          <div className="grid gap-10 mt-10 lg:gap-10 md:grid-cols-2 xl:grid-cols-3 ">
            {dataPost.slice(2).map((post: any, index: any) => (
              <PostList
                key={index}
                post={post}
                aspect="square"
              />
            ))}
          </div>
          {/* load more button */}
          {nextPage !== '' && (
            <div className="flex justify-center mt-10">
              <button
                className="bg-brand-primary hover:bg-brand-primary-dark text-white font-bold py-2 px-4 rounded"
                onClick={loadMore}
              >
              Load more
              </button>
            </div>
          )}
        </Container>
      </main>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async(context: any) => {
  const { origin } = absoluteUrl(context.req);
  const params = { 'fetchImages': true, 'fetchBodies': false };
  const res = await axios.get(`${origin}/api/posts`, { params }).then((res: any) => res.data);

  return {
    props: {
      blog: res,
      posts: res.items
    }
  };
};

export default Home;
