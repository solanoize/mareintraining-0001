import React from "react";
import { updateCart } from "../../services/carts";
import { safeChange } from "../../utils/inputUtil";

export default function useCartUpdate() {
  const [object, setObject] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const totalAfterDiscount = React.useMemo(() => {
    const productPrice = object?.product?.price;
    const quantity = object?.quantity;
    const subtotal = productPrice * quantity;
    const discount = object?.discount;
    const discountType = object?.discount_type;
    let result = 0;
    if (discountType === "percent") {
      result = subtotal - subtotal * (discount / 100);
    } else {
      result = subtotal - discount;
    }

    return result ? result : 0;
  }, [object]);

  const subtotal = React.useMemo(() => {
      const productPrice = object?.product?.price;
      const quantity = object?.quantity;
      const result = productPrice * quantity;
      return result ? result : 0;
    }, [object]);

  const onInit = React.useCallback((value) => {
    setObject(value);
  }, []);

  const onUpdate = async (payload) => {
    setError(null);
    setLoading(true);
    const { id, ...rest } = payload;
    try {
      const response = await updateCart(id, rest);
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

  const onClear = () => {
    setObject(null);
  }

  return {
    object,
    error,
    loading,
    isUpdate,
    totalAfterDiscount,
    subtotal,
    onInit,
    onUpdate,
    onChange,
    onClear,
  }
}