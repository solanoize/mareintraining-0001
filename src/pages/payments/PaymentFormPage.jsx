import React from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { PaymentForm } from "../../components/payments";
import { Button } from "devextreme-react";
import { useTransaction } from "../../foundation/hooks";
import { getFieldError } from "../../foundation/services";

export default function PaymentFormPage() {
  const navigate = useNavigate();
  const params = useParams();
  const outletContext = useOutletContext();

  const paymentTransaction = useTransaction("payments");

  const onCreatePayment = async () => {
    try {
      const payload = {};
      payload.invoice = params?.id;
      payload.amount = paymentTransaction.object?.amount;
      payload.method = "Transfer";
      await paymentTransaction.onCreate(payload);
      // not work
      // console.log(outletContext?.onRefreshRoot());
      await outletContext?.onRefresh(params?.id);
      onClosePayment();
    } catch (error) {
      console.warn(error);
    }
  };

  const onClosePayment = () => {
    navigate("../", { replace: true });
  };

  return (
    <React.Fragment>
      {paymentTransaction.error && (
        <div style={{ marginBottom: "16px", marginTop: "16px", color: "red" }}>
          {getFieldError(paymentTransaction.error, "non_field_errors")}
        </div>
      )}

      <div style={{ marginBottom: "16px", marginTop: "16px" }}>
        <PaymentForm
          onValueChange={paymentTransaction.onValueChange}
          object={paymentTransaction.object}
          error={paymentTransaction.error}
        />
      </div>

      <div style={{ marginBottom: "16px", marginTop: "16px" }}>
        <Button text="Save" onClick={onCreatePayment} icon="save" />
      </div>
    </React.Fragment>
  );
}
