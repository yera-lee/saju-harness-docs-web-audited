import Link from "next/link";
import type { ReactNode } from "react";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen bg-paper px-5 py-8 text-ink">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-8">{children}</div>
    </main>
  );
}

export function PrimaryLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      className="inline-flex min-h-12 items-center justify-center rounded-md bg-ink px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-black"
      href={href}
    >
      {children}
    </Link>
  );
}

export function SecondaryLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      className="inline-flex min-h-12 items-center justify-center rounded-md border border-ink/20 px-5 py-3 text-center text-sm font-semibold text-ink transition hover:bg-mist"
      href={href}
    >
      {children}
    </Link>
  );
}
