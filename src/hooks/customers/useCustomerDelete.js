import React from "react";
import { deleteCustomer } from "../../services/customers";

export default function useCustomerDelete() {
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
      const response = await deleteCustomer(id);
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