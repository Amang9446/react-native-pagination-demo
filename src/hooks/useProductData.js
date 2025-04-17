import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

export const useProductData = (fetchAction, selector, pageSize = 10) => {
  const dispatch = useDispatch();
  const { products, status, error, hasMore } = useSelector(selector);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchAction(0));
    }
  }, [status, dispatch, fetchAction]);

  const loadMore = () => {
    if (hasMore && status !== "loading") {
      dispatch(fetchAction(products.length / pageSize));
    }
  };

  return {
    items: products,
    status,
    error,
    hasMore,
    loadMore,
  };
};
