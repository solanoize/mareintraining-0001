import React from "react";
import {
  DataGrid,
  Column,
  MasterDetail,
  Paging,
  FilterRow,
  Sorting,
  Selection,
} from "devextreme-react/data-grid";
import InvoiceHeader from "./InvoiceHeader";

export default function InvoiceList({ dataSource, onSelect, gridRef }) {
  const [, setObject] = React.useState();

  const selectObject = React.useCallback(
    (e) => {
      e.component.byKey(e.currentSelectedRowKeys[0]).done((obj) => {
        setObject(obj);
        onSelect && onSelect(obj);
      });
    },
    [onSelect, setObject]
  );

  function DetailSection({ data: { data } }) {
    return (
      <div>
        <InvoiceHeader object={data} />
      </div>
    );
  }

  return (
    <React.Fragment>
      <DataGrid
        ref={gridRef}
        onSelectionChanged={selectObject}
        showBorders={false}
        height={"100%"}
        columnAutoWidth={true}
        scrolling={{ mode: "virtual" }}
        showColumnLines={true}
        showRowLines={true}
        wordWrapEnabled={true}
        columnResizingMode="nextColumn"
        dataSource={dataSource}
        remoteOperations={{ paging: true, filtering: true }}
        keyExpr="id"
        byKey="id"
      >
        <FilterRow visible={true} />
        <Sorting mode="none" />

        <Paging defaultPageSize={10} />
        <Column dataField="invoice_number" dataType="string" />
        <Column
          caption={"Customer"}
          customizeText={({ value }) => <strong>{value} Ahahah</strong>}
        >
          <Column
            dataField="customer.name"
            caption="Name"
            showColumnLines={false}
          />
          <Column
            dataField="customer.phone"
            showColumnLines={true}
            caption="Phone"
          />
        </Column>
        <Column
          dataField="total"
          dataType="number"
          format={{
            type: "currency",
            precision: 2,
            currency: "IDR",
          }}
        />
        <Column
          dataField="outstanding_amount"
          dataType="number"
          format={{
            type: "currency",
            precision: 2,
            currency: "IDR",
          }}
        />
        <Column dataField="invoice_date" dataType="date" />
        <Selection mode="single" />
      </DataGrid>
    </React.Fragment>
  );
}
