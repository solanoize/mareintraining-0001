import { Outlet, useNavigate, useOutlet } from "react-router-dom";
import React from "react";
import {
  SharedError,
  SharedNavbarBreadcrumb,
  SharedPageHeader,
  SharedPagination,
  SharedSearch,
} from "../../components/shared";
import {
  Button,
  ButtonGroup,
  Card,
  Col,
  Container,
  Row,
} from "react-bootstrap";
import { InvoiceList } from "../../components/invoices";
import { useInvoiceList } from "../../hooks/invoices";

export default function InvoiceListPage() {
  const navigate = useNavigate();
  const outlet = useOutlet();
  const { onGets: onGetInvoices, ...invoiceList } = useInvoiceList();

  React.useEffect(() => {
    onGetInvoices();
  }, [onGetInvoices]);

  const onCreateInvoice = () => {
    navigate("/invoices/create");
  };

  const onDetailInvoice = (value) => {
    navigate(`/invoices/${value?.id}/detail`);
  };

  return (
    <React.Fragment>
      <SharedNavbarBreadcrumb />
      <Container fluid className="mb-4 mt-4">
        <SharedError error={invoiceList.error} />

        {/* <Row className="mb-3">
          <Col>
            <SharedPageHeader
              title={"Invoices"}
              actions={
                <Button variant="dark" onClick={onCreateInvoice}>
                  Create Invoice
                </Button>
              }
            />
          </Col>
        </Row> */}

        {/* <Row className="mb-3">
          <Col>
            <Card>
              <Card.Body>
                <SharedSearch className="w-75" onGets={onGetInvoices} />
              </Card.Body>
            </Card>
          </Col>
        </Row> */}

        <Row className="mb-3">
          <Col>
            <Card className="no-print">
              <Card.Header>
                <div className="d-flex justify-content-between gap-3">
                  <SharedSearch className="w-100" onGets={onGetInvoices} />
                  <Button
                    className="text-nowrap"
                    variant="dark"
                    onClick={onCreateInvoice}
                  >
                    Create Invoice
                  </Button>
                </div>
              </Card.Header>
              <InvoiceList
                collection={invoiceList.collection}
                onSearch={(value) => {
                  onGetInvoices(null, { search: value });
                }}
              >
                {(value) => (
                  <ButtonGroup>
                    <Button
                      variant="dark"
                      onClick={() => onDetailInvoice(value)}
                    >
                      View
                    </Button>
                  </ButtonGroup>
                )}
              </InvoiceList>
              <Card.Footer>
                <SharedPagination
                  onGets={onGetInvoices}
                  pagination={invoiceList.pagination}
                />
              </Card.Footer>
            </Card>
          </Col>

          {outlet && (
            <Col md={5}>
              <Outlet context={{ onRefresh: invoiceList.onRefresh }} />
            </Col>
          )}
        </Row>
      </Container>
    </React.Fragment>
  );
}
