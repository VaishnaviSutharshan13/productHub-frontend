import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/70 bg-white/80 backdrop-blur-xl">
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-3xl font-bold tracking-tight text-slate-900">
          ProductHub
        </Link>

        <div className="flex items-center gap-2 text-sm font-medium sm:gap-4">
          <Link
            href="/"
            className="rounded-full px-4 py-2 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
          >
            Home
          </Link>
          <Link
            href="/add-product"
            className="rounded-full bg-teal-600 px-4 py-2 text-white shadow-sm shadow-teal-600/25 transition hover:bg-teal-700 hover:shadow-md"
          >
            Add Product
          </Link>
        </div>
      </nav>
    </header>
  );
}
