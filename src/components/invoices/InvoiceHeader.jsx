import React from "react";

export default function InvoiceHeader({ object }) {
  return (
    <React.Fragment>
      <dl className="row">
        <dt className="col-sm-3">Invoice Number</dt>
        <dd className="col-sm-9">{object?.invoice_number} </dd>
        <dt className="col-sm-3">Status</dt>
        <dd className="col-sm-9">{object?.status}</dd>
        <dt className="col-sm-3">Invoice Date</dt>
        <dd className="col-sm-9">{object?.invoice_date}</dd>
        <dt className="col-sm-3">Customer</dt>
        <dd className="col-sm-9">
          <div>{object?.customer?.name}</div>
          <div>{object?.customer?.phone}</div>
          <div>{object?.customer?.email}</div>
        </dd>

        <dt className="col-sm-3">Status Payment</dt>
        <dd className="col-sm-9">
          <div>{object?.total}</div>
          <div>{object?.pay}</div>
          <div>{object?.outstanding_amount}</div>
        </dd>
      </dl>
    </React.Fragment>
  );
}
