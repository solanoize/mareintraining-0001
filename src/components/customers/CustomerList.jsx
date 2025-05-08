import React from "react";
import { Table } from "react-bootstrap";

export default function CustomerList({ collection, children }) {
  return (
    <Table className="mt-1 mb-0" borderless striped hover responsive>
      <thead>
        <tr>
          <th>Name Dao Ming Se</th>
          <th>Phone</th>
          <th>Email</th>
          {children && <th>#</th>}
        </tr>
      </thead>
      <tbody>
        {collection?.map((value) => (
          <tr key={value?.id}>
            <td>{value?.name}</td>
            <td>{value?.phone}</td>
            <td>{value?.email}</td>
            {children && <td>{children(value)}</td>}
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
