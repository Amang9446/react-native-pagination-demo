import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  products: [],
  status: "idle",
  error: null,
  hasMore: true,
  currentPage: 0,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (page = 0) => {
    const limit = 10;
    const response = await axios.get(
      `https://dummyjson.com/products?limit=${limit}&skip=${page * limit}`
    );
    return response.data;
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
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = [...state.products, ...action.payload.products];
        state.currentPage += 1;
        state.hasMore = state.products.length < action.payload.total;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { resetProducts } = productSlice.actions;
export default productSlice.reducer;
