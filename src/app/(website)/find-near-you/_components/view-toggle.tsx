"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ViewToggle() {
  const pathname = usePathname();
  const isMapView = pathname === "/find-near-you/map";

  return (
    <div className="flex justify-center mb-4 brand-body text-black uppercase">
      <Link
        href="/find-near-you"
        className={`mr-4 ${!isMapView ? "border-b border-black pb-1" : ""
          }`}
      >
        List
      </Link>
      <Link
        href="/find-near-you/map"
        className={isMapView ? " border-b border-black pb-1" : ""}
      >
        Map
      </Link>
    </div>
  );
}
