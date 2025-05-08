import React from "react";
import { Button, Table } from "react-bootstrap";
import {
  DataGrid,
  Column,
  ColumnChooser,
  ColumnChooserSearch,
  ColumnChooserSelection,
  Position,
  SearchPanel,
  Pager,
} from "devextreme-react/data-grid";
export default function InvoiceList({ collection, onSearch, children }) {
  const [columns] = React.useState([
    "invoice_number",
    "invoice_date",
    "status",
    "total",
    "outstanding_amount",
    "customer.name",
  ]);

  return (
    <React.Fragment>
      <DataGrid id="popupContainer" columns={columns} dataSource={collection}>
        <SearchPanel
          onTextChange={(value) => onSearch(value)}
          visible={true}
          width={240}
          placeholder="Search..."
        />
        <Pager visible={true} />
        <ColumnChooser allowSearch={true} height="340px" enabled={true}>
          <Position
            my="right top"
            at="right bottom"
            of=".dx-datagrid-column-chooser-button"
          />

          <ColumnChooserSearch
            enabled={true}
            editorOptions={{ placeholder: "Search column" }}
          />
          <Column dataField="invoice_date" dataType="datetime"></Column>
          <ColumnChooserSelection
            allowSelectAll={true}
            selectByClick={true}
            recursive={false}
          />
        </ColumnChooser>
      </DataGrid>
    </React.Fragment>
    // <Table className="mt-1 mb-0" borderless striped hover responsive>
    //   <thead>
    //     <tr>
    //       <th>Invoice Number</th>
    //       <th>Invoice Date</th>
    //       <th>Status</th>
    //       <th>Total</th>
    //       <th>Outstanding Amount</th>
    //       <th>Customer</th>
    //       {children && <th>#</th>}
    //     </tr>
    //   </thead>
    //   <tbody>
    //     {collection?.map((value) => (
    //       <tr key={value?.id}>
    //         <td>{value?.invoice_number}</td>
    //         <td>{value?.invoice_date}</td>
    //         <td>{value?.status}</td>
    //         <td>{value?.total}</td>
    //         <td>{value?.outstanding_amount}</td>
    //         <td>{value?.customer?.name}</td>
    //         {children && <th>{children(value)}</th>}
    //       </tr>
    //     ))}
    //   </tbody>
    // </Table>
  );
}
