import { Autocomplete } from "devextreme-react";
import { useDataSource } from "../../foundation/hooks";

export default function CustomerAutocomplete({ onSelect }) {
  const customerDataSource = useDataSource("customers");

  return (
    <Autocomplete
      label="Customer"
      dataSource={customerDataSource.dataSource}
      valueExpr="name"
      displayExpr="name"
      searchExpr="NAME" // ⬅️ penting
      showClearButton={true}
      minSearchLength={1}
      onSelectionChanged={({ selectedItem }) => onSelect(selectedItem)}
    />
  );
}
