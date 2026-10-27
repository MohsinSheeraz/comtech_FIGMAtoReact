"use client";
import { usePathname } from "next/navigation";

/* The admin panel has its own screens, so the site header and footer are not drawn there. */
export function HideInAdmin({ children }: { children: React.ReactNode }) {
    const path = usePathname() ?? "";
    if (path === "/admin" || path.startsWith("/admin/")) return null;
    return <>{children}</>;
}
