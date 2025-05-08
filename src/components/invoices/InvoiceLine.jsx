import { Table } from "react-bootstrap";

export default function InvoiceLine({ object }) {
  return (
    <Table borderless striped hover responsive>
      <thead>
        <tr className="table-dark">
          <th>Product</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Subtotal</th>
          <th>Discount</th>
          <th className="text-end">Total</th>
        </tr>
      </thead>

      <tbody>
        {object?.items?.map((value, index) => (
          <tr key={index}>
            <td>{value?.product?.name}</td>
            <td>{value?.quantity}</td>
            <td>{value?.price}</td>
            <td>{value?.subtotal}</td>
            <td>
              {value?.discount_type === "percent" && `${value?.discount}%`}
              {value?.discount_type === "flat" && `-${value?.discount}`}
            </td>
            <td className="text-end table-secondary fw-bold">
              {value?.discounted_subtotal}
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr className="active">
          <th colSpan={5} className="text-end text-top">
            Total
          </th>
          <td className="text-end table-secondary fw-bold">{object?.total}</td>
        </tr>
        <tr className="active">
          <th colSpan={5} className="text-end text-top">
            Tax
          </th>
          <td className="text-end table-secondary fw-bold">
            {object?.tax || 0}%
          </td>
        </tr>
        <tr>
          <th colSpan={5} className="text-end text-top">
            Change
          </th>
          <td className="fs-3 text-end table-secondary">{object?.change}</td>
        </tr>
        <tr>
          <th colSpan={5} className="text-end text-top">
            Outstanding Amount
          </th>
          <td className="fs-3 text-end fw-bold table-secondary">
            {object?.outstanding_amount}
          </td>
        </tr>
      </tfoot>
    </Table>
  );
}
