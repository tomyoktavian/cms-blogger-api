import React from 'react'
import Image from 'next/image';
import dynamic from 'next/dynamic';
import Container from '@components/container'
// import { useRouter } from 'next/router'
import { getBlogsList, getBlog } from '@lib/api/blogs'
import type { GetStaticPaths, GetStaticProps } from 'next'
import { useCreateSlug } from "@utils/use-create-slug";
import Layout from "@components/layout";

type Props = {
  post: any
}

const PostDetail = ({ post }: Props) => {
  // const router = useRouter()
  const Date = dynamic(() => import('components/post_date'), { ssr: false }) as any

  // console.log('slug', post)
  return (
    <>
      <Layout>
        <Container className="!pt-0">
          <div className="max-w-screen-md mx-auto ">
            <div className="text-center">
              {/* <CategoryLabel categories={post.categories} /> */}
              {post.labels.map((label: any, index: any) => (
                <span
                  key={index}
                  className="inline-block px-3 py-1 mb-4 text-xs font-medium leading-6 text-green-800 uppercase bg-green-100 rounded-full dark:bg-green-800 dark:text-green-100">
                  {label}
                </span>
              ))}
            </div>

            <h1 className="mt-2 mb-3 text-3xl font-semibold tracking-tight text-center lg:leading-snug text-brand-primary lg:text-4xl dark:text-white">
              {post.title}
            </h1>

            <div className="flex justify-center mt-3 space-x-3 text-gray-500 ">
              <div className="flex items-center gap-3">
                <div className="relative flex-shrink-0 w-10 h-10">
                  <Image
                    src={`http:${post?.author?.image.url}`}
                    objectFit="cover"
                    alt={post?.author?.displayName}
                    // placeholder="blur"
                    layout="fill"
                    className="rounded-full"
                  />
                </div>
                <div>
                  <p className="text-gray-800 dark:text-gray-400">
                    {post?.author?.displayName}
                  </p>
                  <div className="flex items-center space-x-2 text-sm">
                    <Date date={post.published} className="text-gray-500 dark:text-gray-400" />
                    {/* <span>
                    · {post.estReadingTime || "5"} min read
                  </span> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>

        <Container>
          <article className="max-w-screen-md mx-auto ">
            <div className="mx-auto my-3 prose prose-base dark:prose-invert prose-a:text-blue-500"
              dangerouslySetInnerHTML={{ __html: post.content }}
            ></div>
          </article>
        </Container>
      </Layout>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await getBlogsList().then(res => res.data.items)

  return {
    paths: res.flatMap((post: any) => `/post/${useCreateSlug(post.title)}.id.${post.id}`) || [],
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async (context: any) => {
  const { params, locale }: any = context
  const { slug } = params

  try {
    const id = slug.split('.id.')[1]
    const res = await getBlog(id).then(res => res.data)

    return {
      props: {
        post: res
      },
      revalidate: 10
    }
  } catch (error) {
    return {
      notFound: true,
    }
  }
}

export default PostDetail