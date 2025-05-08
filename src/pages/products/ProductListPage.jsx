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
import { useLocation, useNavigate, useOutlet } from "react-router-dom";

export default function ProductListPage() {
  const navigate = useNavigate();
  const outlet = useOutlet();
  const location = useLocation();
  const { onGets: onGetProducts, ...productList } = useProductList();

  React.useEffect(() => {
    onGetProducts();
  }, [onGetProducts, location]);

  const onCreateProduct = () => {
    navigate("/products/create");
  };

  const onUpdateProduct = (value) => {
    navigate(`/products/${value?.id}/update`);
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
                onSelect={onUpdateProduct}
              />
              <Card.Footer>
                <SharedPagination
                  onGets={onGetProducts}
                  pagination={productList.pagination}
                />
              </Card.Footer>
            </Card>
          </Col>
          {outlet && <Col>{outlet}</Col>}
        </Row>
      </Container>
    </React.Fragment>
  );
}
