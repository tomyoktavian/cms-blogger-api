import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { cx } from '@utils/classnames';
// import { trimString } from '@utils/use-trim-text';

type Props = {
  post: any,
  aspect?: 'landscape' | 'square',
  preloadImage?: boolean,
}

const PostList: React.FC<Props> = ({ post, aspect, preloadImage }) => {
  const Date = dynamic(() => import('components/post_date'), { ssr: false }) as any;
  // const description = trimString(post?.content, 165);

  return (
    <>
      <article className="cursor-pointer group">
        <div
          className={cx(
            'relative overflow-hidden transition-all bg-gray-100 rounded-md dark:bg-gray-800   hover:scale-105',
            aspect === 'landscape' ? 'aspect-video' : 'aspect-square'
          )}>
          <Link href={post.url}>
            <a>
              {post?.images?.length > 0 ? (
                <Image
                  src={post?.images[0].url}
                  alt={post.title}
                  // placeholder="blur"
                  sizes="80vw"
                  // sizes="(max-width: 640px) 90vw, 480px"
                  layout="fill"
                  objectFit="cover"
                  priority={!!preloadImage}
                  className="transition-all"
                />
              ) : (
                <Image
                  src={'https://via.placeholder.com/320x320?text=No-Image'}
                  alt={post.title}
                  // placeholder="blur"
                  sizes="80vw"
                  // sizes="(max-width: 640px) 90vw, 480px"
                  layout="fill"
                  objectFit="cover"
                  priority={!!preloadImage}
                  className="transition-all"
                />
              )}
            </a>
          </Link>
        </div>
        {/* <CategoryLabel categories={post.categories} /> */}
        <h2 className="mt-2 text-lg font-semibold tracking-normal text-brand-primary dark:text-white">
          <Link href={post.url}>
            <span
              className="bg-gradient-to-r from-green-200 to-green-100 dark:from-purple-800 dark:to-purple-900
              bg-[length:0px_10px]
              bg-left-bottom
              bg-no-repeat
              transition-[background-size]
              duration-500
              hover:bg-[length:100%_3px] group-hover:bg-[length:100%_10px]">
              {post.title}
            </span>
          </Link>
        </h2>

        {/* {description && (
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 line-clamp-3">
            {description}
          </p>
        )} */}

        <div className="flex items-center mt-3 space-x-3 text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-3">
            <div className="relative flex-shrink-0 w-5 h-5">
              <Image
                src={`http:${post?.author?.image.url}`}
                objectFit="cover"
                layout="fill"
                alt={post?.author?.displayName}
                // placeholder="blur"
                sizes="30px"
                className="rounded-full"
              />
            </div>
            <span className="text-sm">{post.author.displayName}</span>
          </div>
          <span className="text-xs text-gray-300 dark:text-gray-600">
            &bull;
          </span>
          <Date date={post.published} className="text-sm"/>
        </div>
      </article>
    </>
  );
};

export default PostList;