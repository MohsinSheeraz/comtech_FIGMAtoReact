import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogCard } from "@/components/BlogCard";
import { CtaPanel } from "@/components/CtaPanel";
import { PageGlows } from "@/components/Glow";
import { SideForm } from "@/components/SideForm";
import { getPost, posts } from "@/lib/posts";
// import FacebookIcon from "@/public/images/icon_Facebook.png";
// import XIcon from "@/public/images/icon_Twitter.png";
// import YTIcon from "@/public/images/icon_YouTube.png";
// import InstagramIcon from "@/public/images/icon_Insta.png";
import { FaFacebook } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";
import { SiYoutube } from "react-icons/si";
import { RiInstagramFill } from "react-icons/ri";







export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  return { title: post ? `${post.title} | Comtech Associates` : "Article | Comtech Associates" };
}

const intro =
  "What happens when a critical server goes down during peak business hours in Pakistan? Orders stop, employees lose access to systems, and customers quickly lose trust. Professional server support services help businesses avoid this risk by providing continuous monitoring, fast issue resolution, and expert management of both on-premises and cloud servers. With local challenges such as power instability and rising cyber threats, reliable server support has become essential for business continuity.";

const toc = [
  "How Professional Server Support Services Work",
  "Why Pakistani Businesses Need Professional Server Support",
  "Cost Advantages of Outsourced Server Management",
  "24/7 Monitoring and Incident Response",
  "Role of Certified Professionals",
  "Network Security and Compliance",
  "Infrastructure Challenges in Pakistan",
  "How Does Server Support Fit Into IT Lifecycle Planning?",
  "Types of Servers Commonly Supported",
  "Professional Server Support vs Break/Fix: What's the Difference?",
  "How Comtech Associates Supports Businesses",
];

const sections: { h: string; p: string[] }[] = [
  {
    h: "How Professional Server Support Services Work",
    p: [
      "Professional server support involves continuous monitoring, maintenance, security updates, and troubleshooting of business servers. Instead of relying only on internal staff, companies work with specialized teams that manage server health on a daily basis. This approach helps detect issues early and reduces the chances of unexpected downtime. Support teams usually track system performance, apply updates, manage backups, and respond quickly when problems appear.",
      "By handling routine and complex tasks, professional support allows internal teams to focus on core business activities rather than constant firefighting.",
    ],
  },
  {
    h: "Why Pakistani Businesses Need Professional Server Support",
    p: [
      "Running servers in Pakistan comes with unique challenges. Sudden load shedding, unstable internet connections, and growing cyber threats put constant pressure on business systems.",
      "Even a short period of downtime can disrupt sales, delay operations, and affect customer trust. Many organizations also struggle to find and retain skilled IT staff, which makes consistent server management difficult.",
      "Professional server support provides the monitoring and rapid response needed to keep systems stable, even during local infrastructure problems.",
    ],
  },
  {
    h: "Cost Advantages of Outsourced Server Management",
    p: [
      "Hiring full-time system administrators in major cities involves high salaries, benefits, and ongoing training costs. These expenses continue to rise as technology becomes more complex.",
      "Professional server support offers a predictable monthly fee in PKR. This allows businesses to access skilled expertise while keeping IT expenses under control.",
      "Instead of investing heavily in recruitment and internal training, companies can scale support according to their actual needs and avoid unnecessary overhead.",
    ],
  },
  {
    h: "24/7 Monitoring and Incident Response",
    p: [
      "Server issues often occur outside regular office hours. Continuous monitoring helps detect high resource usage, storage problems, and security threats before they cause system failure.",
    ],
  },
];

const H2 = "mt-8 text-[34px] font-medium leading-[44px] tracking-tighter";
const P = "mt-4 text-[18px] leading-[31px] tracking-tighter";

const icons = [{ label: "Facebook", icon: FaFacebook, href: "#", }, { label: "X", icon: FaTwitter, href: "#", }, { label: "YouTube", icon: SiYoutube, href: "#", }, { label: "Instagram", icon: RiInstagramFill, href: "#", },];

const frameBg =
  "linear-gradient(180deg, #040404 0%, rgba(69, 22, 187, 0.42) 38%, rgba(69, 22, 187, 0.55) 62%, #040404 100%)";

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const recent = posts.filter((p) => p.slug !== slug).slice(0, 4);
  const related = posts.filter((p) => p.slug !== slug).slice(4, 7);

  return (
    <main>
      <PageGlows variant="inner" />

      <section className="wrap pt-12">
        <div className="gborder-new relative aspect-[1400/390] overflow-hidden rounded-[40px]">
          <Image src={post.image} alt="" fill priority sizes="1400px" className="object-cover" />
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
                How 24/7 Infrastructure Support Reduces Downtime in a market.
              </h1>
              <p className={`${P} mt-8`}>{intro}</p>

              <h2 className={H2}>Introduction:</h2>
              <p className={P}>{intro}</p>

              <h2 className={H2}>Table of Contents</h2>
              <ul className="mt-4 list-disc space-y-1 pl-6 text-[17px] leading-[30px] tracking-tighter">
                {toc.map((t, i) => (
                  <li key={t}>{i === 0 ? <><span className="underline">Server Support Services</span> Work</> : t}</li>
                ))}
              </ul>

              {sections.map((s) => (
                <div key={s.h}>
                  <h2 className={H2}>{s.h}</h2>
                  {s.p.map((t) => (
                    <p key={t} className={P}>{t}</p>
                  ))}
                </div>
              ))}
            </article>

            <aside className="flex flex-col gap-5 min-[1101px]:sticky min-[1101px]:top-6">
              <SideForm />

              <div className="rounded-[30px] leadership-border p-4">
                <ul className="flex flex-col gap-4">
                  {recent.map((r) => (
                    <li key={r.slug}>
                      <Link href={`/blog/${r.slug}`} className="flex items-center gap-4">
                        <Image src={r.image} alt="" width={96} height={64} className="h-16 w-24 shrink-0 rounded-xl object-cover" />
                        <span>
                          <span className="block text-[15px] leading-[20px] tracking-normal">
                            From the land of smiles to the kingdom of wonder
                          </span>
                          <span className="mt-1 block text-[11px] text-white/60 tracking-normal">05 days ago</span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center justify-between px-1">
                <span className="text-[15px] tracking-normal">Share this article</span>
                <div className="flex gap-3">
                  {icons.map((ic) => { const Icon = ic.icon; return (<a key={ic.label} href={ic.href} aria-label={`Share on ${ic.label}`} className="grid size-9 place-items-center rounded-full" > <Icon size={25} aria-hidden="true" /> </a>); })}
                </div>
              </div>
            </aside>
          </div>
        </section>
      </div>

      <section className="wrap sec mt-10">
        <div className="grid grid-cols-1 gap-x-[33px] gap-y-14 min-[700px]:grid-cols-2 min-[1101px]:grid-cols-3">
          {related.map((p) => (
            <BlogCard key={p.slug} post={p} />
          ))}
        </div>
      </section>

      <CtaPanel
        title="Let's Build a Network That Never Lets You Down"
        text="Whether you're outgrowing your current setup or building a new office from scratch, a conversation with our network team is the place to start."
        label="Get a Free Network Consultation"
      />
    </main>
  );
}
