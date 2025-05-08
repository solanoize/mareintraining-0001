import React from "react";
import { updateProduct } from "../../services/products";
import { safeChange } from "../../utils/inputUtil";

export default function useProductUpdate() {
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
      const response = await updateProduct(id, rest);
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

  const onSetCategory = (value) => {
    /**
     * State is not intended to be the request payload to the server. 
     * Its primary focus is on the representation in the UI:
     *  - State is used to manage UI representation and 
     *    ensure a dynamic and responsive interface.
     *  - Payload is primarily for transferring data between 
     *    the client and the server, often derived from or influenced by the state.
     * 
     * In essence:
     *  - State is used to manage UI representation and ensure a dynamic and responsive interface.
     *  - Payload is primarily for transferring data between the client and the server, 
     *    often derived from or influenced by the state.
     */
    const current = object ?? {};
    setObject({ ...current, category: value });
  }

  return {
    object,
    error,
    loading,
    isUpdate,
    onInit,
    onUpdate,
    onChange,
    onSetCategory,
  }
}
