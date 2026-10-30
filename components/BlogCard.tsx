import Image from "next/image";
import Link from "next/link";
import { Btn } from "./Button";
import type { Post } from "@/lib/posts";

export function BlogCard({
  post,
  clampExcerpt = false,
}: {
  post: Post;
  clampExcerpt?: boolean;
}) {
  return (
    <article className="group flex flex-col border border-gray-700 rounded-[30px] p-6 transition-transform duration-300 ease-out hover:-translate-y-1">
      <Link
        href={`/blog/${post.slug}`}
        className="gborder-new relative block overflow-hidden rounded-[30px]"
      >
        <Image
          src={post.thumbnailImage || post.image}
          alt=""
          width={597}
          height={346}
          className="h-auto w-full"
        />
      </Link>
      {/* <p className="mt-10 text-[14px] leading-[20px] tracking-normal">
        Posted by: {post.author} &nbsp;|&nbsp; Date: {post.date}
      </p> */}
      <div className="mt-10 flex items-center justify-between gap-4 text-[14px] leading-[20px] tracking-normal">
        <p className="shrink-0">Date: {post.date}</p>
        {post.author && (
          <p className="min-w-0 truncate text-right" title={post.author}>
            {post.author}
          </p>
        )}
      </div>
      <h3 className="mt-4 text-[26px] font-medium leading-[34px] tracking-tighter">
        {post.title}
      </h3>
      <p className={`mt-4 text-[18px]! leading-[31px]! tracking-tighter! ${clampExcerpt ? "line-clamp-2" : ""}`}>
        {post.excerpt}
      </p>
      <div className="mt-8">
        <Btn v="o" href={`/blog/${post.slug}`}>
          Read More
        </Btn>
      </div>
    </article>
  );
}
