import React from "react";
import { useProductList } from "../../hooks/products";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import {
  SharedNavbarBreadcrumb,
  SharedPageHeader,
  SharedPagination,
  SharedSearch,
} from "../../components/shared";
import { ProductList } from "../../components/products";
import { useNavigate } from "react-router-dom";

export default function ProductListPage() {
  const navigate = useNavigate();
  const { onGets: onGetProducts, ...productList } = useProductList();

  React.useEffect(() => {
    onGetProducts();
  }, [onGetProducts]);

  const onCreateProduct = () => {
    navigate("/products/create");
  };

  return (
    <React.Fragment>
      <SharedNavbarBreadcrumb />
      <Container className="mb-4 mt-4">
        <SharedPageHeader
          title={"Products"}
          actions={
            <Button variant="dark" onClick={onCreateProduct}>
              Create Product
            </Button>
          }
        />
        <Row className="mb-3">
          <Col>
            <Card>
              <Card.Body>
                <SharedSearch onGets={onGetProducts} />
              </Card.Body>
              <ProductList
                collection={productList.collection}
                onSelect={(value) => {
                  console.log(value);
                }}
              />
              <Card.Footer>
                <SharedPagination
                  onGets={onGetProducts}
                  pagination={productList.pagination}
                />
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}
