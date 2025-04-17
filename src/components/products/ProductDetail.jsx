import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";
import { ButtonGroup, Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FaPlus, FaSave, FaTrash } from "react-icons/fa";
import { FaBoxArchive } from "react-icons/fa6";
import Swal from "sweetalert2";

const UPDATE_PRODUCT = gql`
  mutation UpdateProduct(
    $id: Int!
    $name: String!
    $price: Int!
    $stock: Int!
  ) {
    updateProduct(id: $id, name: $name, price: $price, stock: $stock) {
      success
    }
  }
`;

const DELETE_PRODUCT = gql`
  mutation DeleteProduct($id: Int!) {
    deleteProduct(id: $id) {
      success
    }
  }
`;

export default function ProductDetail({ title, callback, product }) {
  const [show, setShow] = useState(false);
  const [updateProduct] = useMutation(UPDATE_PRODUCT);
  const [deleteProduct] = useMutation(DELETE_PRODUCT);
  const formRef = React.useRef();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleClear = async () => {
    formRef.current.name.value = "";
    formRef.current.price.value = 0;
    formRef.current.stock.value = 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const price = e.target.price.value;
    const stock = e.target.stock.value;

    const response = await updateProduct({
      variables: {
        id: parseInt(product?.id),
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

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: `Do you want to delete "${product?.name}"?`,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `No, Cancel`,
    });

    if (result.isConfirmed) {
      await deleteProduct({
        variables: {
          id: parseInt(product?.id),
        },
      });

      callback && callback(null);
      Swal.fire("Success delete this product", "", "success");
      handleClose();
      handleClear();
    }
  };

  return (
    <>
      <Button disabled={!product} variant="primary" onClick={handleShow}>
        {title ? (
          <>
            <FaBoxArchive /> {title}
          </>
        ) : (
          <>
            <FaBoxArchive /> Product Detail
          </>
        )}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control name="name" defaultValue={product?.name || ""} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                name="price"
                type="number"
                defaultValue={product?.price || 0}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Stock</Form.Label>
              <Form.Control name="stock" defaultValue={product?.stock || 0} />
            </Form.Group>
            <div className="d-flex justify-content-end alig-items-center w-100">
              <ButtonGroup>
                <Button onClick={handleDelete} variant="secondary">
                  <FaTrash /> Remove
                </Button>
                <Button
                  variant="primary"
                  onClick={async () => {}}
                  type="submit"
                >
                  <FaSave /> Save
                </Button>
              </ButtonGroup>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
