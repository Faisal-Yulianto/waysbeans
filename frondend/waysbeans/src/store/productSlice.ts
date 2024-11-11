// src/store/slices/productSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosClient from '../hook/axiosClient';

// Definisikan tipe untuk data produk
interface Product {
  id: number;
  productName: string;
  productDesc: string;
  price: number;
  qty: number;
  image?: string;
  userId: number;
}

// Definisikan tipe state untuk Redux slice
interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

// State awal untuk productSlice
const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
};

// Thunks untuk API call

// Get all products
export const getProducts = createAsyncThunk<Product[]>('product/getProducts', async () => {
  const response = await axiosClient.get('/products');
  return response.data;
});

// Create a product
export const createProduct = createAsyncThunk<Product, Product>(
  'product/createProduct',
  async (productData) => {
    const response = await axiosClient.post('/products', productData);
    return response.data;
  }
);

// Update a product
export const updateProduct = createAsyncThunk<Product, { productId: number; productData: Partial<Product> }>(
  'product/updateProduct',
  async ({ productId, productData }) => {
    const response = await axiosClient.put(`/products/${productId}`, productData);
    return response.data;
  }
);

// Delete a product
export const deleteProduct = createAsyncThunk<number, number>(
  'product/deleteProduct',
  async (productId) => {
    await axiosClient.delete(`/products/${productId}`);
    return productId;
  }
);

// Product slice
const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle get products
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.loading = false;
        state.products = action.payload;
        state.error = null;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch products';
      })

      // Handle create product
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(createProduct.fulfilled, (state, action: PayloadAction<Product>) => {
        state.loading = false;
        state.products.push(action.payload);
        state.error = null;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create product';
      })

      // Handle update product
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action: PayloadAction<Product>) => {
        state.loading = false;
        const index = state.products.findIndex((product) => product.id === action.payload.id);
        if (index !== -1) {
          state.products[index] = action.payload;
        }
        state.error = null;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update product';
      })

      // Handle delete product
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action: PayloadAction<number>) => {
        state.loading = false;
        state.products = state.products.filter((product) => product.id !== action.payload);
        state.error = null;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to delete product';
      });
  },
});

// Selectors
export const selectProducts = (state: { product: ProductState }) => state.product.products;
export const selectLoading = (state: { product: ProductState }) => state.product.loading;
export const selectError = (state: { product: ProductState }) => state.product.error;

// Export reducer
export default productSlice.reducer;
