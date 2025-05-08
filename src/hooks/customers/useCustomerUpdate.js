import React from "react";
import { updateCustomer } from "../../services/customers";
import { safeChange } from "../../utils/inputUtil";

export default function useCustomerUpdate() {
  const [object, setObject] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const onInit = React.useCallback((value) => {
    setObject(value);
  }, []);

  const onUpdate = async (payload) => {
    setError(null);
    setLoading(true);
    const { id, ...rest } = payload;
    try {
      const response = await updateCustomer(id, rest);
      setObject(response?.data);
      return Promise.resolve(response);
    } catch (error) {
      setError(error);
      return Promise.reject(error);
    } finally {
      setLoading(false);
    }
  };

  const isUpdate = React.useMemo(() => object?.id ? true:false , [object]);

  const onChange = (e) => {
    const [name, value] = safeChange(e);
    const current = object ?? {};
    setObject({ ...current, [name]: value });
  }

  return {
    object,
    error,
    loading,
    isUpdate,
    onInit,
    onUpdate,
    onChange,
  }
}