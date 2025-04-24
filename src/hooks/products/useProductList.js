import React from "react";
import { getProducts } from "../../services/products";

export default function useProductList() {
  const [collection, setCollection] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(null);
  const [pagination, setPagination] = React.useState({
    next: null,
    previous: null
  });
  const [currentURL, setCurrentURL] = React.useState(null);
  const [count, setCount] = React.useState(0);

  const onGets = React.useCallback(
    async (customURL, params) => {
      setError(null);
      setLoading(true);
  
      try {
        const response = await getProducts(customURL, params);
        setCollection(response?.data?.results);
        setPagination({
          next: response?.data?.next,
          previous: response?.data?.previous,
        });
        setCount(response?.data?.count);
        setCurrentURL(response?.meta?.url);
        return Promise.resolve(response);
      } catch (error) {
        setError(error);
        return Promise.reject(error);
      } finally {
        setLoading(false);
      }
    }, []);

    const exists = React.useMemo(() => {
      return collection?.length > 0;
    }, [collection]);

    return {
      collection,
      error,
      loading,
      pagination,
      currentURL,
      count,
      onGets,
      exists,
    }
}