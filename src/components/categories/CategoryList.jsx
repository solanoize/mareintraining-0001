import React from "react";
import { Table } from "react-bootstrap";

export default function CategoryList({ collection, onSelect }) {
  return (
    <Table className="mt-1 mb-0" borderless striped hover responsive>
      <thead>
        <tr>
          <th>Name</th>
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
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
