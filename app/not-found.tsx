import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-start px-4 py-24 sm:px-6">
      <p className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-accent">
        Open circuit
      </p>
      <h1 className="mt-3 text-[2rem] font-semibold tracking-tight text-ink">Page not found</h1>
      <p className="mt-3 text-[0.98rem] leading-relaxed text-muted">
        No current flows here. The page may have been renamed, or the link may be wrong.
      </p>
      <div className="mt-7 flex gap-3">
        <Link href="/" className="btn">
          Home
        </Link>
        <Link href="/wiki" className="btn">
          Browse the wiki
        </Link>
      </div>
    </div>
  );
}
