import React from "react";
import { createProduct } from "../../services/products";
import { safeChange } from "../../utils/inputUtil";

export default function useProductCreate() {
  const [object, setObject] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const onCreate = async (payload) => {
    setError(null);
    setLoading(true);
    
    try {
      const response = await createProduct(payload);
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
    onSetCategory,
    onCreate,
    onChange,
  }
}