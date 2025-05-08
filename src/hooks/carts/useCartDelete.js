import React from "react";
import { deleteCart } from "../../services/carts";

export default function useCartDelete() {
  const [object, setObject] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const onInit = React.useCallback((value) => {
    setObject(value);
  }, []);

  const onDelete = async (id) => {
    setError(null);
    setLoading(true);
	
    try {
      const response = await deleteCart(id);
      return Promise.resolve(response);
    } catch (error) {
      setError(error);
      return Promise.reject(error);
    } finally {
      setLoading(false);
    }
  }

  return {
    object,
    error,
    loading,
    onDelete,
    onInit,
  }
}