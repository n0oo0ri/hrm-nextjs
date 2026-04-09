"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

interface NavItem {
  label: string;
  href: string;
  icons: string;
}

export function NavMenu({ items }: { items: NavItem[] }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="flex items-center gap-1 overflow-x-auto pb-2">
      {items.map((item, index) => (
        <Link
          key={item.href}
          href={item.href}
          className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all whitespace-nowrap"
          style={{
            color: hoveredIndex === index ? '#fff' : '#0066cc',
            backgroundColor: hoveredIndex === index ? '#0066cc' : 'transparent',
            fontSize: '13px',
            fontWeight: '500',
          }}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <Image
            src={item.icons}
            alt=""
            width={16}
            height={16}
            style={{
              filter: hoveredIndex === index ? 'brightness(0) invert(1)' : 'brightness(0.3) saturate(0.8)',
            }}
          />
          {item.label}
        </Link>
      ))}
    </div>
  );
}
