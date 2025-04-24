import React from "react";
import { getProducts } from "../../services/products";

export default function useProductLookup() {
  const [collection, setCollection] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [pagination, setPagination] = React.useState({
    next: null,
    previous: null,
  });
  
  const [count, setCount] = React.useState(0);
  const [currentURL, setCurrentURL] = React.useState(null);

  const onGets = React.useCallback(async (customURL, params) => {
    setError(null);
    setLoading(false);

    try {
      const response = await getProducts(customURL, params);
      setCollection(response?.data?.results);
      setPagination({
        next: response?.data?.next,
        previous: response?.data?.previous,
      });
      setCurrentURL(response?.context?.url);
      setCount(response?.data?.count);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    collection,
    setCollection,
    error,
    setError,
    pagination,
    setPagination,
    currentURL,
    setCurrentURL,
    count,
    setCount,
    loading,
    setLoading,
    onGets,
  }
}