import React from "react";
import { Modal } from "react-bootstrap";

function SharedModal({ children, show, onClose, ...props }) {
  return (
    <Modal backdrop="static" show={show} onHide={onClose} {...props}>
      {children}
    </Modal>
  );
}

SharedModal.Title = function Title({ children }) {
  return (
    <Modal.Header closeButton>
      <Modal.Title>{children}</Modal.Title>
    </Modal.Header>
  );
};

SharedModal.Body = function Body({ children }) {
  return <Modal.Body>{children}</Modal.Body>;
};

SharedModal.OuterBody = function OuterBody({ children }) {
  return <React.Fragment>{children}</React.Fragment>;
};

SharedModal.Footer = function Footer({ children }) {
  return <Modal.Footer>{children}</Modal.Footer>;
};

export default SharedModal;
