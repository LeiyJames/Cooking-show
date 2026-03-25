"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";

export default function ConditionalFooter() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  if (isHomePage) {
    return null;
  }

  return <Footer />;
}
