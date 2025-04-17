import { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

export const useProductData = (fetchAction, selector, pageSize = 10) => {
  const dispatch = useDispatch();
  const { products, status, error, hasMore } = useSelector(selector);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchAction(0));
    }
  }, [status, dispatch, fetchAction]);

  const loadMore = useCallback(() => {
    if (hasMore && status !== "loading" && status !== "failed") {
      dispatch(fetchAction(Math.floor(products.length / pageSize)));
    }
  }, [hasMore, status, products.length, pageSize, dispatch, fetchAction]);

  const retryLastFetch = useCallback(() => {
    if (status === "failed") {
      dispatch(fetchAction(Math.floor(products.length / pageSize)));
    }
  }, [status, products.length, pageSize, dispatch, fetchAction]);

  return {
    items: products,
    status,
    error,
    hasMore,
    loadMore,
    retryLastFetch,
  };
};
