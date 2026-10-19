/* template.tsx re-mounts on every navigation. The page-to-page animation now lives in
   components/PageTransition.tsx + app/page-transition.css, so this just passes children through. */
export default function Template({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}