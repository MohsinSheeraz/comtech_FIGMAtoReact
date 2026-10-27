import Link from "next/link";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import type { Post } from "@/lib/posts";

type Item = Pick<Post, "slug" | "title"> | null;

const pill = "inline-flex h-[44px] items-center gap-2 rounded-full border border-white/20 px-5 text-[15px]";

/* Previous / Next post, at the bottom of the post.
   An arrow with no post to go to is shown dimmed and does nothing. */
export function PostNav({ prev, next }: { prev: Item; next: Item }) {
  const button = (item: Item, dir: "prev" | "next") => {
    const Icon = dir === "prev" ? FaArrowLeft : FaArrowRight;
    const label = dir === "prev" ? "Previous" : "Next";
    const inner = (
      <>
        {dir === "prev" && <Icon size={14} aria-hidden="true" />}
        {label}
        {dir === "next" && <Icon size={14} aria-hidden="true" />}
      </>
    );
    return item ? (
      <Link
        href={`/blog/${item.slug}`}
        title={item.title}
        aria-label={`${label} post: ${item.title}`}
        className={`${pill} hover:bg-white/10`}
      >
        {inner}
      </Link>
    ) : (
      <span aria-disabled="true" className={`${pill} cursor-not-allowed opacity-30`}>
        {inner}
      </span>
    );
  };

  return (
    <nav aria-label="More posts" className="mt-10 flex items-center justify-between gap-3 border-t border-white/10 pt-6">
      {button(prev, "prev")}
      {button(next, "next")}
    </nav>
  );
}
