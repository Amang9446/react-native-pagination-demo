import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  products: [],
  status: "idle",
  error: null,
  hasMore: true,
  currentPage: 0,
  lastError: null,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (page = 0) => {
    try {
      const limit = 10;
      const response = await axios.get(
        `https://dummyjson.com/products?limit=${limit}&skip=${page * limit}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch products"
      );
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    resetProducts: (state) => {
      state.products = [];
      state.currentPage = 0;
      state.hasMore = true;
      state.error = null;
      state.lastError = null;
      state.status = "idle";
    },
    clearError: (state) => {
      state.error = null;
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.lastError = null;
        state.products = [...state.products, ...action.payload.products];
        state.currentPage += 1;
        state.hasMore = state.products.length < action.payload.total;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        state.lastError = action.error.message;
        state.hasMore = true;
      });
  },
});

export const { resetProducts, clearError } = productSlice.actions;
export default productSlice.reducer;
