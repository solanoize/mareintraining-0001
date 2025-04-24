import { Table } from "react-bootstrap";

export default function ProductList({ collection, onSelect }) {
  return (
    <Table className="mt-1 mb-1" hover responsive>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>Stock</th>
          <th>Category</th>
        </tr>
      </thead>
      <tbody>
        {collection?.map((value) => (
          <tr
            key={value?.id}
            onClick={() => (onSelect ? onSelect(value) : () => {})}
          >
            <td className={onSelect ? "cursor-pointer text-primary" : ""}>
              {value?.name}
            </td>
            <td>{value?.price}</td>
            <td>{value?.stock}</td>
            <td>{value?.category?.name || "-"}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
