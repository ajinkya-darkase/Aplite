"use client";

import Link from 'next/link';
import { ReactNode } from 'react';
import { ChevronRight } from 'lucide-react';

type BreadcrumbItem = { label: string; href?: string; onClick?: () => void };

type BreadcrumbProps = {
  items: BreadcrumbItem[];
  className?: string;
};

export default function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav aria-label="breadcrumb" className={`flex items-center ${className ?? ''}`}>
      {items.map((it, idx) => (
        <span key={idx} className="flex items-center">
          {it.href ? (
            <Link href={it.href} className="inline-flex items-center gap-2">
              <span className="hover:font-semibold text-xl transition-colors duration-150">{it.label}</span>
            </Link>
          ) : it.onClick ? (
            <button onClick={it.onClick} className="inline-flex items-center gap-2 px-3 py-2">
              <span className="hover:font-semibold text-xl transition-colors duration-150">{it.label}</span>
            </button>
          ) : (
            <span className="text-md text-gray-600">{it.label}</span>
          )}

          {idx < items.length - 1 && <ChevronRight className="mx-2 text-gray-400" />}
        </span>
      ))}
    </nav>
  );
}
