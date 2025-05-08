import React from "react";
import { useInvoiceDetail } from "../../hooks/invoices";
import {
  Outlet,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";
import { Button, ButtonGroup, Card } from "react-bootstrap";
import { SharedError } from "../../components/shared";
import { InvoiceHeader } from "../../components/invoices";

export default function InvoiceDetailPage() {
  const navigate = useNavigate();
  const outletContext = useOutletContext();
  const params = useParams();
  const { onGet: onGetInvoice, ...invoiceDetail } = useInvoiceDetail();

  React.useEffect(() => {
    onGetInvoice(params?.id);
  }, [onGetInvoice, params?.id]);

  const onPrintInvoice = () => {
    window.print();
  };

  const onPayInvoice = () => {};

  const onCloseInvoice = () => {
    navigate("/invoices", { replace: true });
  };

  return (
    <React.Fragment>
      <Card className="mb-3">
        <Card.Header>Invoice</Card.Header>
        <Card.Body>
          <SharedError error={invoiceDetail.error} />
          <InvoiceHeader object={invoiceDetail.object} />
        </Card.Body>
        <Card.Footer className="no-print">
          <ButtonGroup>
            <Button variant="dark" onClick={onPrintInvoice}>
              Print Invoice
            </Button>
            <Button variant="dark" onClick={onPayInvoice}>
              Pay Invoice
            </Button>
            <Button variant="secondary" onClick={onCloseInvoice}>
              Close
            </Button>
          </ButtonGroup>
        </Card.Footer>
      </Card>
      <Outlet
        context={{
          onRefresh: onGetInvoice,
          onRefreshRoot: outletContext.onRefresh,
        }}
      />
    </React.Fragment>
  );
}
