'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { deleteProduct } from '../lib/api';

export default function ProductCard({ product, fallbackIndex = 0 }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState('');
  const fallbackImages = [
    '/product-1.jpg',
    '/product-2.jpg',
    '/product-3.jpg',
    '/product-4.jpg',
  ];
  const placeholderImage =
    fallbackImages[Math.abs(Number(fallbackIndex)) % fallbackImages.length];
  const productImage = product?.image || product?.imageUrl || placeholderImage;

  async function handleDelete() {
    const confirmed = window.confirm('Are you sure you want to delete this product?');
    if (!confirmed) return;

    try {
      setError('');
      setIsDeleting(true);
      await deleteProduct(product._id);
      router.refresh();
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to delete product.');
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <article className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-md transition duration-200 hover:-translate-y-0.5 hover:shadow-lg">
      <img
        src={productImage}
        alt={product.name}
        className="h-48 w-full object-cover"
        onError={(e) => {
          if (e.currentTarget.src !== placeholderImage) {
            e.currentTarget.src = placeholderImage;
          }
        }}
      />

      <div className="space-y-4 p-5">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900">{product.name}</h2>
          <p className="line-clamp-2 overflow-hidden text-ellipsis text-sm leading-6 text-slate-600">
            {product.description}
          </p>
        </div>

        <div className="flex items-center justify-between border-t border-slate-100 pt-3">
          <p className="text-lg font-bold text-slate-900">${Number(product.price).toFixed(2)}</p>
          <p className="text-sm font-medium text-slate-600">
            {new Date(product.createdAt).toLocaleDateString()}
          </p>
        </div>

        {error && <p className="text-sm text-rose-600">{error}</p>}

        <div className="flex items-center gap-3 pt-1">
          <Link
            href={`/edit-product/${product._id}`}
            className="inline-flex flex-1 items-center justify-center rounded-full bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Edit
          </Link>
          <button
            type="button"
            onClick={handleDelete}
            disabled={isDeleting}
            className="inline-flex flex-1 items-center justify-center rounded-full bg-rose-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </article>
  );
}
