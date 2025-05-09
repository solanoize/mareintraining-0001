
export function calculateAndGetSubtotal(quantity, price) {
  const subtotal = quantity * price;
  return subtotal ? subtotal : 0;
}

export function calculateAndGetDiscountedSubtotal(subtotal, discount, discountType) {
  let result = 0;
  if (discountType === "percent") {
    result = subtotal - subtotal * (discount / 100);
  } else if (discountType === 'flat') {
    result = subtotal - discount;
  }

  return result ? result : 0;
}
