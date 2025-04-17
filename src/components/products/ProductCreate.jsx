import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FaPlus } from "react-icons/fa";
import Swal from "sweetalert2";

const CREATE_PRODUCT = gql`
  mutation CreateProduct($name: String!, $price: Int!, $stock: Int!) {
    createProduct(name: $name, price: $price, stock: $stock) {
      success
    }
  }
`;

export default function ProductCreate({ title, callback }) {
  const [show, setShow] = useState(false);
  const [createProduct] = useMutation(CREATE_PRODUCT);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const price = e.target.price.value;
    const stock = e.target.stock.value;

    const response = await createProduct({
      variables: {
        name,
        price: parseInt(price),
        stock: parseInt(stock),
      },
    });

    callback && callback(response);
    handleClose();
    Swal.fire({
      title: "Create Success",
      icon: "success",
    });
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        {title ? (
          <>
            <FaPlus /> {title}
          </>
        ) : (
          <>
            <FaPlus /> New Product
          </>
        )}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>New Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control name="name" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control name="price" type="number" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Stock</Form.Label>
              <Form.Control name="stock" />
            </Form.Group>
            <Button variant="primary" onClick={async () => {}} type="submit">
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
