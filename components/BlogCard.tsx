import Image from "next/image";
import Link from "next/link";
import { Btn } from "./Button";
import type { Post } from "@/lib/posts";

export function BlogCard({ post }: { post: Post }) {
  return (
    <article className="flex flex-col">
      <Link
        href={`/blog/${post.slug}`}
        className="gborder-new relative block overflow-hidden rounded-[30px]"
      >
        <Image
          src={post.image}
          alt=""
          width={597}
          height={346}
          className="h-auto w-full"
        />
      </Link>
      <p className="mt-10 text-[14px] leading-[20px] tracking-normal">
        Posted by: {post.author} &nbsp;|&nbsp; Date: {post.date}
      </p>
      <h3 className="mt-8 text-[26px] font-medium leading-[34px] tracking-tighter">
        {post.title}
      </h3>
      <p className="mt-5 text-[18px]! leading-[31px]! tracking-tighter!">{post.excerpt}</p>
      <div className="mt-8">
        <Btn v="o" href={`/blog/${post.slug}`}>
          Read More
        </Btn>
      </div>
    </article>
  );
}
