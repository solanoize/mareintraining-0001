import React from "react";
import { Table } from "react-bootstrap";

export default function CartList({ collection, children }) {
  return (
    <Table className="mt-1 mb-1" hover responsive>
      <thead>
        <tr>
          <th>Product</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Stock</th>
          <th>Reminder Stock</th>

          <th>Discount</th>
          <th>Subtotal</th>
          {children && <th>#</th>}
        </tr>
      </thead>
      <tbody>
        {collection?.map((value) => (
          <tr key={value?.id}>
            <td>{value?.product?.name}</td>
            <td>{value?.price}</td>
            <td>{value?.quantity}</td>
            <td>{value?.product?.stock}</td>
            <td>{value?.product?.stock - value?.quantity}</td>

            <td className="text-end">
              {value?.discount_type === "percent" && `${value?.discount}%`}
              {value?.discount_type === "flat" && `-${value?.discount}`}
            </td>
            <td className="table-secondary text-end">
              {value?.discounted_subtotal}
            </td>
            {children && <th>{children(value)}</th>}
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
