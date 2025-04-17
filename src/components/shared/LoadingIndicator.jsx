import { Spinner } from "react-bootstrap";

export default function LoadingIndicator({ isLoading, size = "sm" }) {
  return (
    isLoading && <Spinner size={size} animation="grow" variant="primary" />
  );
}
