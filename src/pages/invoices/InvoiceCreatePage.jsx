import React from "react";

import { SharedError } from "../../components/shared";
import {
  Button,
  ButtonGroup,
  Card,
  Col,
  Container,
  Row,
} from "react-bootstrap";
import { InvoiceForm } from "../../components/invoices";
import { useCustomerCreate, useCustomerList } from "../../hooks/customers";
import {
  CustomerOptionForm,
  CustomerOptionList,
} from "../../components/customers";
import { Outlet, useNavigate, useOutletContext } from "react-router-dom";
import { useInvoiceCreate } from "../../hooks/invoices";

export default function InvoiceCreatePage() {
  const navigate = useNavigate();
  const { onRefresh } = useOutletContext();
  const [showCustomerList, setShowCustomerList] = React.useState(false);
  const [showCustomerCreate, setShowCustomerCreate] = React.useState(false);

  const { onBuildInvoiceNumber, ...invoiceCreate } = useInvoiceCreate();
  const customerList = useCustomerList();
  const customerCreate = useCustomerCreate();

  React.useEffect(() => {
    function buildInvoice() {
      return "INV/456/2025/04";
    }

    onBuildInvoiceNumber(buildInvoice);
  }, [onBuildInvoiceNumber]);

  const onShowCustomerList = async () => {
    try {
      await customerList.onGets();
      setShowCustomerList(true);
    } catch (error) {
      console.log(error);
    }
  };

  const onHideCustomerList = () => {
    setShowCustomerList(false);
  };

  const onSelectCustomer = (value) => {
    invoiceCreate.onSetCustomer(value);
    onHideCustomerList();
  };

  const onShowCustomerCreate = () => {
    setShowCustomerCreate(true);
  };

  const onHideCustomerCreate = async () => {
    try {
      setShowCustomerCreate(false);
      await customerList.onGets();
    } catch (error) {
      console.warn(error);
    }
  };

  const onCreateCustomer = async () => {
    try {
      const payload = {};
      payload.name = customerCreate.object?.name;
      payload.phone = customerCreate.object?.phone;
      payload.email = customerCreate.object?.email;
      const response = await customerCreate.onCreate(payload);
      invoiceCreate.onSetCustomer(response?.data);
      await onHideCustomerCreate();
    } catch (error) {
      console.warn(error);
    }
  };

  const onCreateInvoice = async () => {
    try {
      const payload = {};
      payload.customer = invoiceCreate.object?.customer?.id;
      payload.invoice_number = invoiceCreate.object?.invoice_number;
      payload.invoice_date = invoiceCreate.object?.invoice_date;
      payload.note = invoiceCreate.object?.note;
      await invoiceCreate.onCreate(payload);
      onRefresh();
      // navigate("/invoices", { replace: true });
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <React.Fragment>
      <SharedError error={invoiceCreate.error} />
      <SharedError error={customerList.error} />
      <SharedError error={customerCreate.error} />

      <Row className="mb-3">
        <Col>
          <Card>
            <Card.Header>New Invoice</Card.Header>
            <Card.Body>
              <Row className="mb-3">
                <Col>
                  <InvoiceForm.InvoiceNumberField
                    error={invoiceCreate.error}
                    object={invoiceCreate.object}
                    onChange={invoiceCreate.onChange}
                  />
                </Col>
                <Col>
                  <InvoiceForm.InvoiceDateField
                    error={invoiceCreate.error}
                    object={invoiceCreate.object}
                    onChange={invoiceCreate.onChange}
                  />
                </Col>
              </Row>
              {/* <InvoiceForm
                error={invoiceCreate.error}
                object={invoiceCreate.object}
                onChange={invoiceCreate.onChange}
                customerOptions={
                  <React.Fragment>
                    <Button
                      variant="outline-secondary"
                      onClick={onShowCustomerCreate}
                    >
                      New
                    </Button>
                    <Button
                      variant="outline-secondary"
                      onClick={onShowCustomerList}
                    >
                      Open
                    </Button>
                  </React.Fragment>
                }
              /> */}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col>
          <Outlet />
        </Col>
      </Row>

      <Row className="mb-3">
        <Col>
          <Card>
            <Card.Header>Customer</Card.Header>
            <Card.Body>
              <Row>
                <Col>
                  <InvoiceForm.CustomerField
                    error={invoiceCreate.error}
                    object={invoiceCreate.object}
                  >
                    <Button
                      variant="outline-secondary"
                      onClick={onShowCustomerCreate}
                    >
                      New
                    </Button>
                    <Button
                      variant="outline-secondary"
                      onClick={onShowCustomerList}
                    >
                      Open
                    </Button>
                  </InvoiceForm.CustomerField>
                </Col>
              </Row>
            </Card.Body>
            <Card.Footer>
              <ButtonGroup>
                <Button onClick={onCreateInvoice} variant="dark">
                  Save
                </Button>
              </ButtonGroup>
            </Card.Footer>
          </Card>
        </Col>
      </Row>

      <CustomerOptionList
        collection={customerList.collection}
        error={customerList.error}
        onGets={customerList.onGets}
        onHide={onHideCustomerList}
        onSelect={onSelectCustomer}
        pagination={customerList.pagination}
        show={showCustomerList}
        title={"Customer Options"}
      />

      <CustomerOptionForm
        error={customerCreate.error}
        object={customerCreate.object}
        onChange={customerCreate.onChange}
        onHide={onHideCustomerCreate}
        onSave={onCreateCustomer}
        show={showCustomerCreate}
        title={"New Customer"}
      />
    </React.Fragment>
  );
}
