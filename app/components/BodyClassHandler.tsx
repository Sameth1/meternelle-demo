"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function BodyClassHandler() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/" || pathname === "/koleksiyon") {
      document.body.classList.add("hero-page");
    } else {
      document.body.classList.remove("hero-page");
    }
    return () => document.body.classList.remove("hero-page");
  }, [pathname]);

  return null;
}
