'use client';

import { useState } from 'react';

export default function ProductForm({
  initialValues,
  onSubmit,
  submitLabel = 'Save Product',
}) {
  const [formData, setFormData] = useState({
    name: initialValues?.name || '',
    description: initialValues?.description || '',
    price: initialValues?.price?.toString() || '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError('');
      setSuccess('');
      setIsSubmitting(true);

      await onSubmit({
        ...formData,
        price: Number(formData.price),
      });

      setSuccess('Saved successfully.');
    } catch (err) {
      const message = err?.response?.data?.message;
      setError(Array.isArray(message) ? message.join(', ') : message || 'Something went wrong.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto w-full max-w-3xl rounded-3xl border border-slate-200 bg-white/95 p-6 shadow-xl shadow-slate-200/60 backdrop-blur sm:p-8 lg:p-10"
    >
      <div className="grid gap-5">
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-semibold text-slate-700">
            Product Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
            className="block w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-100"
            placeholder="Example: Laptop"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="description" className="block text-sm font-semibold text-slate-700">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={5}
            className="block w-full resize-none rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-100"
            placeholder="Example: Lightweight and powerful laptop"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="price" className="block text-sm font-semibold text-slate-700">
            Price
          </label>
          <input
            id="price"
            name="price"
            type="number"
            min="0"
            step="0.01"
            value={formData.price}
            onChange={handleChange}
            required
            className="block w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-100"
            placeholder="Example: 999.99"
          />
        </div>

        {error && <p className="mt-1 text-sm font-medium text-rose-600">{error}</p>}
        {success && <p className="mt-1 text-sm font-medium text-emerald-700">{success}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-teal-600 to-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-600/20 transition hover:from-teal-700 hover:to-emerald-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? 'Saving...' : submitLabel}
        </button>
      </div>
    </form>
  );
}
