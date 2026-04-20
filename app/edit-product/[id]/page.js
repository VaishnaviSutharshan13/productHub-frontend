'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import ProductForm from '../../../components/ProductForm';
import { getProductById, updateProduct } from '../../../lib/api';

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadProduct() {
      try {
        setError('');
        setLoading(true);
        const data = await getProductById(params.id);
        setProduct(data);
      } catch (err) {
        setError(err?.response?.data?.message || 'Failed to load product');
      } finally {
        setLoading(false);
      }
    }

    if (params?.id) {
      loadProduct();
    }
  }, [params?.id]);

  async function handleUpdate(payload) {
    await updateProduct(params.id, payload);
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
            Edit Product
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-200 sm:text-base">
            Update product details in the same clean form used for creating products.
          </p>
        </div>
      </div>

      {loading && (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-600 shadow-sm">
          Loading product...
        </div>
      )}

      {error && (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 p-5 text-sm text-rose-700 shadow-sm">
          {error}
        </div>
      )}

      {!loading && !error && product && (
        <ProductForm
          initialValues={{
            name: product.name,
            description: product.description,
            price: product.price,
          }}
          onSubmit={handleUpdate}
          submitLabel="Update Product"
        />
      )}
    </section>
  );
}
