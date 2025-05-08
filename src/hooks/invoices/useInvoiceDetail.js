import React from "react";
import { getInvoice } from "../../services/invoices";

export default function useInvoiceDetail() {
  const [object, setObject] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const onGet = React.useCallback(async (id) => {
    setError(null);
    setLoading(true);
    
    try {
      const response = await getInvoice(id);
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