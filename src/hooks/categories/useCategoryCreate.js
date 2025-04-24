import React from "react";
import { createCategory } from "../../services/categories";
import { safeChange } from "../../utils/inputUtil";

export default function useCategoryCreate() {
  const [object, setObject] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const onCreate = async (payload) => {
    setError(null);
    setLoading(true);

    try {
      const response = await createCategory(payload);
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

  return {
    object,
    error,
    loading,
    onCreate,
    onChange,
  }
}