import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Container from '@components/container';
import PostList from '@components/postlist';
import Layout from '@components/layout';
import { blogs } from '@lib/api/blogger_api_v3';
import { getLocalPosts } from '@lib/api/local_api';
import type { GetStaticProps } from 'next';

const Home: NextPage = ({ blog, posts, post }: any) => {
  const [dataPost, setDataPost] = React.useState<any[]>([]);
  const [nextPage, setNextPage] = React.useState<string>('');

  React.useEffect(() => {
    setDataPost(post);
    setNextPage(posts?.nextPageToken || '');
  }, [posts, post]);

  const loadMore = () => {
    return new Promise<void>((resolve, reject) => {
      const params = { 'fetchImages': true, 'fetchBodies': true, 'pageToken': nextPage };
      getLocalPosts(params).then(res => {
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
        <title>{blog.name}</title>
        <meta name="title" content={blog.name} />
        <meta name="description" content={blog.description} />

        <meta property="og:type" content="website" />
        <meta property="og:url" content={process.env.NEXT_PUBLIC_DOMAIN} />
        <meta property="og:title" content={blog.name} />
        <meta property="og:description" content={blog.description} />

      </Head>
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
                  className="bg-gray-900 dark:bg-zinc-50 rounded dark:text-black text-white font-bold py-2 px-4 rounded"
                  onClick={loadMore}
                >
              Load more
                </button>
              </div>
            )}
          </Container>
        </main>
      </Layout>
    </>
  );
};

export const getStaticProps: GetStaticProps = async(context: any) => {
  const key = process.env.BLOGGER_API_KEY;
  try {
    const data = await blogs({ key }).then((res: any) => res.data);
    const params = { 'fetchImages': true, 'fetchBodies': true, key };
    const res = await getLocalPosts(params).then(res => res.data);
    return {
      props: {
        blog: data,
        posts: res || {},
        post: res?.items || []
      },
      revalidate: 10
    };
  } catch (error) {
    console.log(error);
    return {
      notFound: true
    };
  }
};

export default Home;
