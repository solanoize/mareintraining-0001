import React from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { PaymentForm } from "../../components/payments";
import { usePaymentCreate } from "../../hooks/payments";
import { Card } from "react-bootstrap";
import { SharedError } from "../../components/shared";
import { Button } from "devextreme-react";

export default function PaymentFormPage() {
  const params = useParams();
  const outletContext = useOutletContext();
  const paymentCreate = usePaymentCreate();

  const onCreatePayment = async () => {
    try {
      const payload = {};
      payload.invoice = params?.id;
      payload.amount = paymentCreate.object?.amount;
      payload.method = "Transfer";
      await paymentCreate.onCreate(payload);
      await outletContext?.onRefresh(params?.id);
      await outletContext?.onRefreshRoot();
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <React.Fragment>
      <Card>
        <Card.Body>
          <SharedError error={paymentCreate.error} />
          <PaymentForm
            object={paymentCreate.object}
            onChange={paymentCreate.onChange}
          />
        </Card.Body>
        <Card.Footer>
          <Button text="Save" onClick={onCreatePayment} />
          {/* <Button onClick={onCreatePayment}>Save</Button> */}
        </Card.Footer>
      </Card>
    </React.Fragment>
  );
}
