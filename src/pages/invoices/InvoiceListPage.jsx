import { Outlet, useNavigate } from "react-router-dom";
import React from "react";
import { InvoiceList } from "../../components/invoices";

import Splitter, { Item } from "devextreme-react/splitter";
import Menu, { Item as MenuItem } from "devextreme-react/cjs/menu";
import { useDataSource, useTransaction } from "../../foundation/hooks";

export default function InvoiceListPage() {
  const navigate = useNavigate();
  const invoiceDataSource = useDataSource("invoices");
  const invoiceTransaction = useTransaction("invoices");

  const onCreateInvoice = () => {
    navigate("/invoices/create");
  };

  const onDetailInvoice = () => {
    navigate(`/invoices/${invoiceTransaction.object?.id}/detail`);
  };

  return (
    <React.Fragment>
      <Splitter id="splitter">
        <Item
          resizable={false}
          collapsible={true}
          collapsedSize={"30%"}
          collapsed={true}
          render={() => (
            <div className="pane-content">
              <Outlet
                context={{
                  onRefresh: invoiceDataSource.onRefresh,
                }}
              />
            </div>
          )}
        />
        <Item resizable={true} collapsible={true}>
          <Splitter orientation="vertical">
            <Item
              resizable={true}
              collapsedSize="8%"
              maxSize={"8%"}
              size={"8%"}
              collapsible={true}
              render={() => (
                <Menu>
                  <MenuItem
                    text="New Invoice"
                    onClick={() => onCreateInvoice()}
                  />
                  <MenuItem
                    disabled={!invoiceTransaction.isDetail}
                    text={"Payment"}
                    onClick={() => onDetailInvoice()}
                  />
                </Menu>
              )}
            ></Item>
            <Item
              resizable={true}
              collapsible={true}
              collapsedSize="100%"
              render={() => (
                <React.Fragment>
                  <InvoiceList
                    // hooks ref still doesn't work in new React version vs DevExtreme
                    // because devextreme still make ref using old version react.
                    gridRef={invoiceDataSource.gridRef}
                    dataSource={invoiceDataSource.dataSource}
                    onSelect={(value) => invoiceTransaction.onInit(value)}
                  />
                </React.Fragment>
              )}
            />
          </Splitter>
        </Item>
      </Splitter>
    </React.Fragment>
  );
}
