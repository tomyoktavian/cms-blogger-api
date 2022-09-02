import React from 'react';
import Head from 'next/head';
import type { NextPage, GetStaticPaths, GetStaticProps } from 'next';
import { serachLocalPost, getLocalPosts } from '@lib/api/local_api';
import { useRouter } from 'next/router';
import Label from '@components/pages/label';
import LabelSearch from '@components/pages/label/label_search';

type Props = {
  label: string;
  posts: any;
  post: any[];
}

const Labels: NextPage<Props> = ({ label, posts, post }) => {
  const { query } = useRouter();

  React.useEffect(() => {
    console.log('label', label);
    console.log('posts', posts);
    console.log('post', post);
  }, [label, posts, post]);

  if (query.label?.length === 1 && query.label?.slice(-1)[0] === 'label') {
    return (
      <>
        <Head>
          <title>Label</title>
          <meta name="title" content="Label" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://blog.mediasolutif.com/" />
          <meta property="og:title" content="Label" />
        </Head>
        <Label posts={posts} post={post} />
      </>
    );
  }

  if (query.label?.length === 2) {
    return (
      <>
        <Head>
          <title>{label}</title>
          <meta name="title" content={label} />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://blog.mediasolutif.com/" />
          <meta property="og:title" content={label} />
        </Head>
        <LabelSearch posts={posts} post={post} />
      </>
    );
  }

  return (
    <div></div>
  );
};

export const getStaticPaths: GetStaticPaths = async() => {
  return {
    paths: [
      { params: { label: ['label'] }}
    ],
    fallback: true // fallback to 404 page if no match is found
  };
};

export const getStaticProps: GetStaticProps = async({ params }: any) => {
  const { label }: any = params!;
  const key = process.env.BLOGGER_API_KEY;

  if (label?.length === 1) {
    try {
      const params = { 'fetchBodies': true, key };
      const res = await serachLocalPost(params).then(res => res.data);

      return {
        props: {
          posts: res,
          post: res?.items || []
        },
        revalidate: 10
      };
    } catch (error) {
      return {
        props: {
          posts: {},
          post: []
        },
        revalidate: 10
      };
    }
  } else if (label?.length === 2) {
    try {
      const params = { labels: label?.slice(-1)[0], 'fetchBodies': true, key };
      const res = await getLocalPosts(params).then((res: any) => res.data);

      return {
        props: {
          label: label?.slice(-1)[0],
          posts: res,
          post: res?.items || []
        },
        revalidate: 10
      };
    } catch (error) {
      return {
        props: {
          label: 'Label not found',
          posts: {},
          post: []
        },
        revalidate: 1
      };
    }
  } else {
    return {
      notFound: true
    };
  }
};

export default Labels;