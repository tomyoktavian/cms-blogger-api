import React from 'react';
import Head from 'next/head';
import Layout from '@components/layout';
import Container from '@components/container';
import PostList from '@components/postlist';
// import { serachPosts } from '@lib/api/blogger_api_v3';
import type { GetServerSideProps } from 'next';
import axios from 'axios';
import { useRouter } from 'next/router';
import absoluteUrl from 'next-absolute-url';

const Search = ({ query, posts, post }: any) => {
  const router = useRouter();
  const [dataPost, setDataPost] = React.useState<any[]>([]);
  const [nextPage, setNextPage] = React.useState<string>('');

  React.useEffect(() => {
    setDataPost(post);
    setNextPage(posts.nextPageToken || '');
  }, [posts, post]);

  const loadMore = () => {
    return new Promise<void>((resolve, reject) => {
      const filter = { 'fetchBodies': true, 'pageToken': nextPage };
      const params = { ...router.query, ...filter };
      axios.get('/api/search', { params }).then((res: any) => {
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
      <Head>
        <title>{query || 'Search'}</title>
        <meta name="title" content={query || 'Search'} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://blog.mediasolutif.com/" />
        <meta property="og:title" content={query || 'Search'} />
      </Head>
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

export const getServerSideProps: GetServerSideProps = async(context: any) => {
  const { origin } = absoluteUrl(context.req);
  const { query } = context;
  const filter = { 'fetchBodies': true, key: process.env.BLOGGER_API_KEY };
  const params = { ...query, ...filter };
  const res = await axios.get(`${origin}/api/search`, { params }).then((res: any) => res.data);
  return {
    props: {
      query: query?.q || '',
      posts: res,
      post: res.items
    }
  };
};

export default Search;