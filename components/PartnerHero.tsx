"use client";
import Link from "next/link";
import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Btn } from "@/components/Button";
import { EASE } from "@/components/Reveal";
import { PartnerLockup } from "@/components/PartnerLockup";

/* Partner page hero: text on the left, animated "Comtech + Partner" card on the right.
   Stacks on tablet/phone (text first, card below). Any <br/> in the title is ignored so the
   headline wraps naturally in the narrower column. */
export function PartnerHero({
  title,
  text,
  cta,
  href = "/contact",
  secondary,
}: {
  title: ReactNode;
  text: ReactNode;
  cta: string;
  href?: string;
  secondary?: string;
}) {
  const reduce = useReducedMotion();
  const rise = (i: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 28 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay: 0.1 + i * 0.12, ease: EASE },
        };

  return (
    <section className="wrap relative pb-12 pt-10 md:pt-16 lg:pb-20 lg:pt-24 my-32!">
      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-14 xl:gap-20">
        <div className="text-center lg:text-left">
          <motion.h1
            {...rise(0)}
            className="text-[34px] font-medium leading-[42px] tracking-tighter sm:text-[44px] sm:leading-[52px] xl:text-[56px] xl:leading-[64px] [&_br]:hidden"
          >
            {title}
          </motion.h1>

          <motion.p
            {...rise(1)}
            className="mx-auto mt-5 max-w-[560px] text-[16px] leading-7 tracking-tighter text-white/90 lg:mx-0 lg:text-[18px] lg:leading-[31px]"
          >
            {text}
          </motion.p>

          <motion.div
            {...rise(2)}
            className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start"
          >
            {/* inline colour: the global `a { color: inherit }` would override a utility class */}
            <Link
              href={href}
              style={{ color: "#000" }}
              className="inline-flex min-h-[46px] items-center justify-center rounded-[10px] bg-white px-6 py-2 text-center text-[16px] font-medium leading-tight transition hover:bg-white/90"
            >
              {cta}
            </Link>
            {secondary && (
              <Btn v="o" href="/services">
                {secondary}
              </Btn>
            )}
          </motion.div>
        </div>

        <PartnerLockup
          layout="row"
          className="mx-auto w-full max-w-[560px] lg:max-w-none"
        />
      </div>
    </section>
  );
}
