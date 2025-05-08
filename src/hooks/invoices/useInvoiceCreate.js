import React from "react";
import { safeChange } from "../../utils/inputUtil";
import { createInvoice } from "../../services/invoices";

export default function useInvoiceCreate() {
  const [object, setObject] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const onCreate = async (payload) => {
    setError(null);
    setLoading(true);

    try {
      const response = await createInvoice(payload);
      setObject(response?.data);
      return Promise.resolve(response);
    } catch (error) {
      setError(error);
      return Promise.reject(error);
    } finally {
      setLoading(false);
    }
  };

  const onChange = (e) => {
    const [name, value] = safeChange(e);
    const current = object ?? {};
    setObject({...current, [name]: value});
  }

  const onSetCustomer = (value) => {
    const current = object ?? {};
    setObject({...current, customer: value});
  };

  const onBuildInvoiceNumber = React.useCallback((fn) => {
    setObject((c) => ({...c, invoice_number: fn()}));
  }, [])

  return {
    object,
    error,
    loading,
    onCreate,
    onChange,
    onSetCustomer,
    onBuildInvoiceNumber,
  }
}