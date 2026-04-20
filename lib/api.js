import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function getProducts() {
  const res = await api.get('/products');
  return res.data;
}

export async function getProductById(id) {
  const res = await api.get(`/products/${id}`);
  return res.data;
}

export async function createProduct(data) {
  const res = await api.post('/products', data);
  return res.data;
}

export async function updateProduct(id, data) {
  const res = await api.patch(`/products/${id}`, data);
  return res.data;
}

export async function deleteProduct(id) {
  const res = await api.delete(`/products/${id}`);
  return res.data;
}
