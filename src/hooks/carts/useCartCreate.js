import React from "react";
import { safeChange } from "../../utils/inputUtil";
import { createCart } from "../../services/carts";

export default function useCartCreate() {
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

  const onCreate = async (payload) => {
    setError(null);
    setLoading(true);

    try {
      const response = await createCart(payload);
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
  };

  const onSetProduct = (value) => {
    const current = object ?? {};
    setObject({ ...current, product: value });
  };

  const onReset = () => setObject(null);

  return {
    object,
    error,
    loading,
    onCreate,
    onChange,
    onSetProduct,
    onReset,
    subtotal,
    totalAfterDiscount,
  };
}
