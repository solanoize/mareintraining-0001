import React from "react";
import { getCart } from "../../services/carts";

export default function useCartDetail() {
  const [object, setObject] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const onGet = React.useCallback(async (id) => {
    setError(null);
    setLoading(true);
    
    try {
      const response = await getCart(id);
      setObject(response?.data);
      return Promise.resolve(response);
    } catch (error) {
      setError(error);
      return Promise.reject(error);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    object,
    error,
    loading,
    onGet,
  }
}