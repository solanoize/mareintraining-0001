import React from "react";
import useProductCreate from "../../hooks/products/useProductCreate";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import ProductForm from "../../components/products/ProductForm";
import {
  SharedNavbarBreadcrumb,
  SharedPageHeader,
} from "../../components/shared";
import { useNavigate } from "react-router-dom";
import { CategoryOptionList } from "../../components/categories";
import { useCategoryList } from "../../hooks/categories";

export default function ProductCreatePage() {
  const [show, setShow] = React.useState(false);
  const navigate = useNavigate();
  const productCreate = useProductCreate();
  const categoryList = useCategoryList();

  const onCreateProduct = async () => {
    try {
      const payload = { ...productCreate.object };
      await productCreate.onCreate(payload);
      navigate("/products", { replace: true });
    } catch (error) {
      console.warn(error);
    }
  };

  const onShow = async () => {
    try {
      await categoryList.onGets();
      setShow(true);
    } catch (error) {
      console.warn(error);
    }
  };

  const onClose = () => {
    setShow(false);
  };

  return (
    <React.Fragment>
      <SharedNavbarBreadcrumb />
      <Container className="mb-4 mt-4">
        <SharedPageHeader title={"Create Product"} />
        <Row className="mb-3">
          <Col>
            <ProductForm
              {...productCreate}
              categoryOptions={
                <Button onClick={onShow} variant="outline-secondary">
                  Open
                </Button>
              }
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Card>
              <Card.Body>
                <Button variant="dark" onClick={onCreateProduct}>
                  Save
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <CategoryOptionList
        collection={categoryList.collection}
        error={categoryList.error}
        onClose={onClose}
        onGets={categoryList.onGets}
        onSelect={() => {}}
        pagination={categoryList.pagination}
        show={show}
      />
    </React.Fragment>
  );
}
