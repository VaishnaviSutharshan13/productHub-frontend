import { getProducts } from '../lib/api';
import ProductCard from '../components/ProductCard';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  let products = [];
  let error = '';

  try {
    products = await getProducts();
  } catch (err) {
    error =
      err?.response?.data?.message ||
      'Could not load products. Check if backend is running and NEXT_PUBLIC_API_URL is correct.';
  }

  return (
    <section className="space-y-8">
      <div className="relative overflow-hidden rounded-3xl border border-white/70 bg-gradient-to-br from-slate-950 via-slate-900 to-teal-800 px-6 py-10 text-white shadow-2xl shadow-slate-900/10 sm:px-10 sm:py-12 lg:px-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.16),_transparent_35%),radial-gradient(circle_at_bottom_left,_rgba(45,212,191,0.22),_transparent_30%)]" />
        <div className="relative space-y-3 py-2 sm:py-3">
          <h1 className="max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Manage Products
          </h1>
          <p className="max-w-2xl text-sm leading-6 text-slate-200 sm:text-base">
            Keep your product catalog organized with a clean and simple dashboard.
          </p>
          <div className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-slate-100">
            {products.length > 0 ? `${products.length} products in inventory` : 'No products yet'}
          </div>
        </div>
      </div>

      <section className="space-y-5">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
              All Products
            </h2>
            <p className="mt-2 text-sm text-slate-600 sm:text-base">
              Create, edit, and delete products from this dashboard.
            </p>
          </div>
          <div className="text-sm text-slate-500">
            {products.length > 0 ? `${products.length} items` : 'No items yet'}
          </div>
        </div>

        {error ? (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-4 text-sm text-rose-700 shadow-sm">
            {error}
          </div>
        ) : null}

        {!error && products.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center shadow-sm sm:px-10">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-50 text-2xl">
              ✨
            </div>
            <h3 className="mt-4 text-lg font-semibold text-slate-900">No products yet</h3>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-600">
              Your product list is empty. Use the Add Product button in the top right to create your first item.
            </p>
          </div>
        ) : null}

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {products.map((product, index) => (
            <ProductCard key={product._id} product={product} fallbackIndex={index} />
          ))}
        </div>
      </section>
    </section>
  );
}
