'use client';

import { useRouter } from 'next/navigation';
import ProductForm from '../../components/ProductForm';
import { createProduct } from '../../lib/api';

export default function AddProductPage() {
  const router = useRouter();

  async function handleCreate(payload) {
    await createProduct(payload);
    router.push('/');
    router.refresh();
  }

  return (
    <section className="mx-auto max-w-5xl space-y-8 py-4 sm:py-8">
      <div className="relative overflow-hidden rounded-3xl border border-white/70 bg-gradient-to-br from-slate-950 via-slate-900 to-teal-800 px-6 py-8 text-white shadow-2xl shadow-slate-900/10 sm:px-8 sm:py-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.16),_transparent_35%),radial-gradient(circle_at_bottom_left,_rgba(45,212,191,0.22),_transparent_30%)]" />
        <div className="relative">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-200">
          ProductHub
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Add Product
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-200 sm:text-base">
            Create a new product with a clean, centered form layout that works well on desktop and mobile.
          </p>
        </div>
      </div>
      <ProductForm onSubmit={handleCreate} submitLabel="Create Product" />
    </section>
  );
}
