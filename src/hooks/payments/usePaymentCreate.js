import React from "react";
import { safeChange } from "../../utils/inputUtil";
import { createPayment } from "../../services/payments";

export default function usePaymentCreate() {
  const [object, setObject] = React.useState({});
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const onSetInvoice = React.useCallback((value) => {
    setObject((c) => ({ ...c, invoice: value }));
  }, []);

  const onCreate = async (payload) => {
    setError(null);
    setLoading(true);
    
    try {
      const response = await createPayment(payload);
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
    setObject({ ...current, [name]: value });
  }

  const onReset = () => {
    setObject({});
  }

  const onFullPayment = (amountBill) => {
    setObject((c) => ({...c, amount: amountBill}));
  }

  return {
    object,
    error,
    loading,
    onSetInvoice,
    onCreate,
    onChange,
    onReset,
    onFullPayment,
  }

}