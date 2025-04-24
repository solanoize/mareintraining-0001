import React from "react";
import { Alert, Form } from "react-bootstrap";
import { FaInfoCircle } from "react-icons/fa";

function NonField({ error }) {
  return (
    <React.Fragment>
      {error?.data?.non_field_errors && (
        <Alert variant="warning" className="pb-0">
          <ul className="list-unstyled">
            {error?.data?.non_field_errors?.map((message, index) => (
              <li className="text-danger" key={index}>
                <FaInfoCircle /> {message}
              </li>
            ))}
          </ul>
        </Alert>
      )}
    </React.Fragment>
  );
}

function Detail({ error }) {
  return (
    <React.Fragment>
      {error?.data?.detail && (
        <Alert className="mb-3 mt-3" variant="warning">
          <FaInfoCircle color="red" /> {error?.data?.detail}
        </Alert>
      )}
    </React.Fragment>
  );
}

function Field({ error, field }) {
  return (
    <React.Fragment>
      {error?.data?.[field] && (
        <React.Fragment>
          {error?.data?.[field]?.map((message, index) => (
            <Form.Text key={index} className="text-danger">
              {message}
            </Form.Text>
          ))}
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

export default function SharedError({ error, field }) {
  if (field) {
    return <Field error={error} field={field} />;
  } else if (error?.data?.non_field_errors) {
    return <NonField error={error} />;
  }

  return <Detail error={error} />;
}
