import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaPanel } from "@/components/CtaPanel";
import { PageGlows } from "@/components/Glow";
// import { SideForm } from "@/components/SideForm";
// import { getPost, posts } from "@/lib/posts";
import { FaFacebook } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";
import { SiYoutube } from "react-icons/si";
import { RiInstagramFill } from "react-icons/ri";
import {
  getAllSlugs,
  getPost,
  getRecentPosts,
} from "@/lib/posts";
import { DEFAULT_SIZES } from "@/lib/post-code";

export async function generateStaticParams() {
  return (await getAllSlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Article | Comtech Associates" };

  const title = post.seo.metaTitle ?? `${post.title} | Comtech Associates`;
  const description = post.seo.metaDescription ?? post.excerpt;
  const image = post.seo.ogImage ?? post.image;

  return {
    title,
    description,
    keywords: post.seo.metaTags,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { type: "article", title, description, images: [image] },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

const H2 = "mt-8 text-[34px] font-medium leading-[44px] tracking-tighter";
const P = "mt-4 text-[18px] leading-[31px] tracking-tighter";

const icons = [
  { label: "Facebook", icon: FaFacebook, href: "#" },
  { label: "X", icon: FaTwitter, href: "#" },
  { label: "YouTube", icon: SiYoutube, href: "#" },
  { label: "Instagram", icon: RiInstagramFill, href: "#" },
];

const frameBg =
  "linear-gradient(180deg, transparent 0%, rgba(69, 22, 187, 0.42) 38%, rgba(69, 22, 187, 0.55) 62%, #040404 100%)";

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const recent = await getRecentPosts(slug, 4);

  const sz = post.sizes ?? DEFAULT_SIZES;
  const toc =
    post.toc ??
    (post.content
      ? post.content.filter((b) => b.t === "h2").map((b) => b.text)
      : post.sections.map((s) => s.h));

  return (
    <main>
      <PageGlows variant="inner" />

      <section className="wrap pt-12!">
        <div className="gborder-new relative md:aspect-[1400/500] overflow-hidden rounded-[40px]">
          <Image src={post.image} alt="" fill priority sizes="1400px" className="hidden! md:block! object-cover" />
          {/* ForMobile */}
          <Image
            src={post.image}
            alt=""
            width={1400}
            height={250}
            className="block! md:hidden! object-cover"
          />
        </div>
        <span className="mt-10 inline-flex h-[44px] items-center rounded-full border border-white/20 px-6 text-[16px] tracking-normal">
          {post.category}
        </span>
      </section>

      <div
        className="relative isolate mx-auto mt-6 w-[94%] max-w-[1764px] rounded-[40px] pb-16"
        style={{ background: frameBg }}
      >
        <section className="wrap sec">
          <div className="grid items-start gap-6 min-[1101px]:grid-cols-[minmax(0,1fr)_380px]">
            <article className="rounded-[30px] leadership-border  p-6 sm:p-10">
              <h1 className="text-[34px] font-medium leading-[44px] tracking-tighter sm:text-[46px] sm:leading-[56px]">
                {post.title}
              </h1>
              {post.quickAnswer?.trim() && (
                <div className="mt-8 w-full rounded-2xl border border-white/20 bg-white/5 p-6">
                  <h2 className="text-[14px] font-medium uppercase tracking-wide text-white/60">
                    Quick Answer
                  </h2>
                  <p className="mt-3 text-[18px] leading-[31px] tracking-tighter">
                    {post.quickAnswer}
                  </p>
                </div>
              )}
              <p className={`${P} mt-8`}>{post.intro}</p>

              {post.content
                ? post.content.map((b, i) => {
                    if (b.t === "p")
                      return (
                        <p
                          key={i}
                          className="mt-4 tracking-tighter"
                          style={{ fontSize: sz.p, lineHeight: 1.7 }}
                        >
                          {b.text}
                        </p>
                      );
                    const Tag = b.t;
                    return (
                      <Tag
                        key={i}
                        className="mt-8 font-medium tracking-tighter"
                        style={{ fontSize: sz[b.t], lineHeight: 1.3 }}
                      >
                        {b.text}
                      </Tag>
                    );
                  })
                : post.sections.map((s) => (
                    <div key={s.h}>
                      <h2 className={H2}>{s.h}</h2>
                      {s.p.map((t) => (
                        <p key={t} className={P}>
                          {t}
                        </p>
                      ))}
                    </div>
                  ))}
            </article>

            <aside className="flex flex-col gap-5 min-[1101px]:sticky min-[1101px]:top-6">
              {/* <SideForm /> */}

              {toc.length > 0 && (
                <nav
                  aria-label="Table of contents"
                  className="rounded-[30px] leadership-border p-6"
                >
                  <p className="text-[14px] font-medium uppercase tracking-wide text-white/60">
                    Table of Contents
                  </p>
                  <ol className="mt-3 list-decimal space-y-1.5 pl-6 text-[17px] leading-[28px] tracking-tighter">
                    {toc.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ol>
                </nav>
              )}

              <div className="rounded-[30px] leadership-border p-4">
                <ul className="flex flex-col gap-4">
                  {recent.map((r) => (
                    <li key={r.slug}>
                      <Link
                        href={`/blog/${r.slug}`}
                        className="flex items-center gap-4"
                      >
                        <Image
                          src={r.image}
                          alt=""
                          width={96}
                          height={64}
                          className="h-16 w-24 shrink-0 rounded-xl object-cover"
                        />
                        <span>
                          <span className="block text-[15px] leading-[20px] tracking-normal">
                            From the land of smiles to the kingdom of wonder
                          </span>
                          <span className="mt-1 block text-[11px] text-white/60 tracking-normal">
                            05 days ago
                          </span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center justify-between px-1">
                <span className="text-[15px] tracking-normal">
                  Share this article
                </span>
                <div className="flex gap-3">
                  {icons.map((ic) => {
                    const Icon = ic.icon;
                    return (
                      <a
                        key={ic.label}
                        href={ic.href}
                        aria-label={`Share on ${ic.label}`}
                        className="grid size-9 place-items-center rounded-full"
                      >
                        {" "}
                        <Icon size={25} aria-hidden="true" />{" "}
                      </a>
                    );
                  })}
                </div>
              </div>
            </aside>
          </div>
        </section>
      </div>

      <CtaPanel
        title="Let's Build a Network That Never Lets You Down"
        text="Whether you're outgrowing your current setup or building a new office from scratch, a conversation with our network team is the place to start."
        label="Get a Free Network Consultation"
      />
    </main>
  );
}
