import React, { useMemo } from "react";
import { createProduct, deleteProduct, getProduct, updateProduct } from "../../services/products";
import { safeChange } from "../../utils/inputUtil";

export default function useProductCommit() {
  const [object, setObject] = React.useState(null);
  const [errorCreate, setErrorCreate] = React.useState(null);
  const [errorGet, setErrorGet] = React.useState(null);
  const [errorUpdate, setErrorUpdate] = React.useState(null);
  const [errorDelete, setErrorDelete] = React.useState(null);
  const [loading, setLoading] = React.useState(false);  

  const onCreate = async (payload) => {
    setErrorCreate(null);
    setLoading(true);

    try {
      const response = await createProduct(payload);
      setObject(response?.data);
    } catch (error) {
      setErrorCreate(error);
    } finally {
      setLoading(false);
    }
  }
  
  const onGet = async (id) => {
    setErrorGet(null);
    setLoading(true);

    try {
      const response = await getProduct(id);
      setObject(response?.data);
    } catch (error) {
      setErrorGet(error);
    } finally {
      setLoading(false);
    }
  };

  const onUpdate = async (payload) => {
    setErrorUpdate(null);
    setLoading(true);
    try {
      const { id, ...rest } = payload;
      const response = await updateProduct(id, rest);
      setObject(response?.data);
    } catch (error) {
      setErrorUpdate(error);
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async (id) => {
    setErrorDelete(null);
    setLoading(false);

    try {
      await deleteProduct(id);
    } catch (error) {
      setErrorDelete(error);
    } finally {
      setLoading(false);
    }
  };

  const onChange = (e) => {
    const [name, value] = safeChange(e);
    const current = object ?? {};
    setObject({ ...current, [name]: value });
  }

  const onSelect = (value) => {
    setObject(value);
  }

  const onReset = () => {
    setObject(null);
  }

  const isDetail = useMemo(() => {
    return object?.id;
  }, [object]);

  return {
    object,
    setObject,
    errorGet,
    setErrorGet,
    errorCreate,
    setErrorCreate,
    errorUpdate,
    setErrorUpdate,
    errorDelete,
    setErrorDelete,
    loading,
    isDetail,
    setLoading,
    onGet,
    onCreate,
    onUpdate,
    onDelete,
    onChange,
    onSelect,
    onReset,
  }

}