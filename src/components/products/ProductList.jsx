import React from "react";
import { View, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { fetchProducts } from "../../store/slices/productSlice";
import { useProductData } from "../../hooks/useProductData";
import InfiniteList from "../common/InfiniteList";
import ProductCard from "./ProductCard";
import LoadingSpinner from "../common/LoadingSpinner";
import ErrorView from "../common/ErrorView";

const ProductList = () => {
  const dispatch = useDispatch();
  const {
    items: products,
    status,
    error,
    loadMore,
  } = useProductData(fetchProducts, (state) => state.products);

  if (status === "loading" && (!products || products.length === 0)) {
    return <LoadingSpinner />;
  }

  if (status === "failed") {
    return (
      <ErrorView error={error} onRetry={() => dispatch(fetchProducts(0))} />
    );
  }

  return (
    <View style={styles.container}>
      <InfiniteList
        data={products || []}
        renderItem={({ item }) => <ProductCard item={item} />}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        onEndReached={loadMore}
        isLoading={status === "loading"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ProductList;
