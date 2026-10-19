import type { Metadata } from "next";
import { BlogCard } from "@/components/BlogCard";
import { Btn } from "@/components/Button";
import { CtaPanel } from "@/components/CtaPanel";
import { PageGlows } from "@/components/Glow";
import { Pagination } from "@/components/Pagination";
import { PER_PAGE } from "@/lib/posts";
import { getPostsPage } from "@/lib/posts";
import { Hero } from "@/components/Hero";

export const metadata: Metadata = { title: "News & Insights | Comtech Associates" };

const frameBg =
  "linear-gradient(180deg, transparent 8.06%, rgba(69, 22, 187, 0.42) 43.03%, #040404 80.62%)";


export default async function Blog({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const { page } = await searchParams;
  const { items, current, total } = await getPostsPage(parseInt(page ?? "1", 10));

  return (
    <main>
      <PageGlows variant="inner" />
            <Hero
        logos={false}
        title={
          <>
              See, What new in the News
          </>
        }
        text={
          <>
          As a certified Cisco partner, Comtech designs, deploys, and monitors the network
          infrastructure banks, hospitals, and manufacturers depend on, <br /> 24/7.
          We serve enterprises in four major cities, backed by certified engineers, not a
          reseller who ships hardware and disappears.
          </>
        }
        primary="Get a Professional Consult Today"
        
      />

      <div
        className="relative isolate mx-auto mt-16 w-[94%] max-w-[1764px] rounded-[40px] pb-10"
        style={{ background: frameBg }}
      >
        <section className="wrap sec">
          <div className="grid grid-cols-1 gap-x-[33px] gap-y-14 min-[700px]:grid-cols-2 min-[1101px]:grid-cols-3">
            {items.map((p) => (
              <BlogCard key={p.slug} post={p} />
            ))}
          </div>
          <Pagination current={current} total={total} />
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
