import { Alert } from "react-bootstrap";
import { FaInfoCircle } from "react-icons/fa";

export default function SharedDetailValidation({ error }) {
  return (
    <>
      {error?.data?.detail && (
        <Alert className="mb-3 mt-3" variant="warning">
          <FaInfoCircle color="red" /> {error?.data?.detail}
        </Alert>
      )}
    </>
  );
}
