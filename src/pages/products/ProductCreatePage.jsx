import React from "react";
import useProductCreate from "../../hooks/products/useProductCreate";
import { Button, Col, Container, Row } from "react-bootstrap";
import ProductForm from "../../components/products/ProductForm";
import { SharedPageHeader } from "../../components/shared";
import { useNavigate } from "react-router-dom";

export default function ProductCreatePage() {
  const navigate = useNavigate();
  const productCreate = useProductCreate();

  const onCreateProduct = async () => {
    try {
      const payload = { ...productCreate.object };
      await productCreate.onCreate(payload);
      navigate("/", { replace: true });
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <React.Fragment>
      <Container className="mb-4 mt-4">
        <SharedPageHeader
          title={"Create Product"}
          actions={
            <Button onClick={onCreateProduct} variant="dark">
              Save
            </Button>
          }
        />
        <Row>
          <Col>
            <ProductForm {...productCreate} />
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}
