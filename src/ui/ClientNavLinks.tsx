// ClientNavLinks.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import processUrl from "../../sanity/lib/processUrl";
import { motion } from "framer-motion";

export default function ClientNavLinks({ navigation }: { navigation: any }) {
  const pathname = usePathname();
  return (
    <>
      {navigation?.links?.map((link: any) => {
        const href = processUrl(link, {
          base: false,
          params: link.params,
        });
        const isActive = pathname === href;

        return (
          <Link
            key={link._key}
            href={href}
            className={isActive ? "active" : ""}
          >
            {link.label}
          </Link>
          
        );
      })}
    </>
  );
}
