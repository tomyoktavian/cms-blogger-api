import type { NextPage } from 'next';
// import Head from 'next/head'
// import Image from 'next/image'
import Container from '@components/container';
import { getBlogsList } from '@lib/api/blogs';
import PostList from '@components/postlist';
import Layout from '@components/layout';
import type { GetStaticProps } from 'next';

const Home: NextPage = ({ blog, posts }: any) => {
  // console.log('blog', blog)
  return (
    <Layout>
      <main>
        <Container>
          <div className="grid gap-10 lg:gap-10 md:grid-cols-2 ">
            {posts.slice(0, 2).map((post: any, index: any) => (
              <PostList
                key={index}
                post={post}
                aspect="landscape"
                preloadImage={true}
              />
            ))}
          </div>
          <div className="grid gap-10 mt-10 lg:gap-10 md:grid-cols-2 xl:grid-cols-3 ">
            {posts.slice(2).map((post: any, index: any) => (
              <PostList
                key={index}
                post={post}
                aspect="square"
              />
            ))}
          </div>
        </Container>
      </main>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async(context: any) => {
  try {
    const params = { 'fetchImages': true, 'fetchBodies': false };
    const res = await getBlogsList(params).then(res => res.data);

    return {
      props: {
        blog: res,
        posts: res.items
      },
      revalidate: 10
    };
  } catch (error) {
    return {
      notFound: true
    };
  }
};

export default Home;
