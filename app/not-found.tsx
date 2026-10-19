import type { Metadata } from "next";
import { Btn } from "@/components/Button";
import { PageGlows } from "@/components/Glow";

export const metadata: Metadata = { title: "Page Not Found | Comtech Associates" };

// floating particles: [left %, top %, size px, duration s, delay s]
const dots: [number, number, number, number, number][] = [
  [8, 22, 4, 7, 0], [18, 70, 3, 9, 1.2], [27, 38, 5, 8, 2.1], [36, 82, 3, 10, 0.6],
  [48, 12, 4, 9, 1.8], [58, 76, 5, 7, 0.3], [67, 30, 3, 11, 2.6], [76, 64, 4, 8, 1.1],
  [84, 18, 5, 10, 0.9], [92, 52, 3, 9, 2.3], [14, 48, 3, 12, 3], [88, 84, 4, 8, 1.5],
];

export default function NotFound() {
  return (
    <main>
      <PageGlows variant="inner" />

      <section className="wrap nf">
        {dots.map(([l, t, s, d, de], i) => (
          <i
            key={i}
            aria-hidden
            className="nf-dot"
            style={{ left: `${l}%`, top: `${t}%`, width: s, height: s, animationDuration: `${d}s`, animationDelay: `${de}s` }}
          />
        ))}

        <div className="nf-num" role="img" aria-label="404">
          <span className="nf-d" data-text="4" aria-hidden>4</span>

          <span className="nf-zero" aria-hidden>
            <i className="nf-orbit" />
            <i className="nf-orbit nf-o2" />
            <b className="nf-core" />
          </span>

          <span className="nf-d nf-d2" data-text="4" aria-hidden>4</span>
        </div>

        <h1 className="nf-title">Looks like this connection dropped.</h1>
        <p className="nf-text">
          The page you&apos;re looking for doesn&apos;t exist, was moved, or never made it onto our network.
          Let&apos;s get you back to something that&apos;s up and running.
        </p>

        <div className="row center nf-row">
          <Btn href="/">Back to Home</Btn>
          <Btn v="o" href="/contact">Contact Us</Btn>
        </div>
      </section>

      <style>{`
.nf{position:relative;min-height:calc(100vh - 99px);display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding-top:40px;padding-bottom:90px;overflow:hidden}

/* ---- 4 0 4 ---- */
.nf-num{font-size:clamp(120px,22vw,290px);line-height:.85;font-weight:700;letter-spacing:-.06em;display:flex;align-items:center;justify-content:center;gap:.02em;position:relative;z-index:2}
.nf-d{position:relative;display:inline-block;color:transparent;background:linear-gradient(180deg,#fff 10%,#a78bfa 62%,#5522d6 100%);-webkit-background-clip:text;background-clip:text;filter:drop-shadow(0 0 28px rgba(121,80,226,.55));animation:nf-bob 6s ease-in-out infinite}
.nf-d2{animation-delay:-3s}
@keyframes nf-bob{50%{transform:translateY(-.05em)}}

/* glitch flicker: two offset copies that jump now and then */
.nf-d::before,.nf-d::after{content:attr(data-text);position:absolute;inset:0;background:none;-webkit-background-clip:border-box;background-clip:border-box;opacity:0;pointer-events:none}
.nf-d::before{color:#7aa2ff;animation:nf-gl-a 5s steps(1) infinite}
.nf-d::after{color:#c084fc;animation:nf-gl-b 5s steps(1) infinite}
.nf-d2::before{animation-delay:-2.4s}
.nf-d2::after{animation-delay:-2.4s}
@keyframes nf-gl-a{0%,92%,100%{opacity:0;transform:none}93%{opacity:.8;transform:translate(-.03em,.01em);clip-path:inset(12% 0 55% 0)}95%{opacity:.8;transform:translate(.03em,-.01em);clip-path:inset(60% 0 8% 0)}97%{opacity:0}}
@keyframes nf-gl-b{0%,92%,100%{opacity:0;transform:none}94%{opacity:.7;transform:translate(.03em,0);clip-path:inset(40% 0 30% 0)}96%{opacity:.7;transform:translate(-.03em,.01em);clip-path:inset(5% 0 70% 0)}98%{opacity:0}}

/* ---- the zero = a little planet with two tilted orbit rings ---- */
.nf-zero{position:relative;display:inline-block;width:.68em;height:.68em;perspective:700px;margin:0 .03em}
.nf-core{position:absolute;inset:8%;border-radius:50%;background:radial-gradient(circle at 34% 30%,#e9d5ff 0%,#8b5cf6 34%,#4c1fc4 68%,#14082e 100%);box-shadow:0 0 60px 8px rgba(121,80,226,.55),inset -14px -18px 40px rgba(10,4,40,.7);animation:nf-float 6s ease-in-out infinite}
@keyframes nf-float{50%{transform:translateY(-.04em) scale(1.03)}}
.nf-orbit{position:absolute;inset:-18%;border-radius:50%;border:2px solid rgba(167,139,250,.5);transform:rotateX(70deg) rotateZ(0);animation:nf-spin 9s linear infinite;z-index:3;box-shadow:0 0 14px rgba(139,92,246,.35)}
.nf-orbit::after{content:"";position:absolute;top:-.045em;left:50%;width:.09em;height:.09em;margin-left:-.045em;border-radius:50%;background:#fff;box-shadow:0 0 16px 4px rgba(190,165,255,.9)}
.nf-o2{inset:-34%;transform:rotateX(70deg) rotateY(38deg) rotateZ(0);animation-duration:14s;animation-direction:reverse;border-color:rgba(122,162,255,.38)}
.nf-o2::after{background:#9ec1ff;box-shadow:0 0 16px 4px rgba(122,162,255,.85)}
@keyframes nf-spin{to{transform:rotateX(70deg) rotateY(var(--ry,0deg)) rotateZ(360deg)}}
.nf-o2{--ry:38deg}

/* ---- copy ---- */
.nf-title{margin-top:38px;font-size:clamp(28px,4vw,46px);line-height:1.15;font-weight:500;letter-spacing:-.04em;position:relative;z-index:2}
.nf-text{margin:16px auto 0;max-width:620px;font-size:18px;line-height:31px;letter-spacing:-.04em;color:rgba(255,255,255,.75);position:relative;z-index:2}
.nf-row{margin-top:34px;position:relative;z-index:2}

/* ---- floating particles ---- */
.nf-dot{position:absolute;border-radius:50%;background:#c4b5fd;box-shadow:0 0 12px 2px rgba(167,139,250,.7);opacity:.7;animation:nf-drift ease-in-out infinite alternate;pointer-events:none}
@keyframes nf-drift{from{transform:translate(0,0);opacity:.25}to{transform:translate(18px,-34px);opacity:.9}}

@media (prefers-reduced-motion:reduce){
  .nf-d,.nf-core,.nf-orbit,.nf-dot{animation:none}
  .nf-d::before,.nf-d::after{display:none}
}
@media (max-width:640px){
  .nf{min-height:auto;padding-top:60px}
  .nf-text{font-size:16px;line-height:26px}
}
      `}</style>
    </main>
  );
}