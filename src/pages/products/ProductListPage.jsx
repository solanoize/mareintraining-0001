import React from "react";
import { useProductList } from "../../hooks/products";
import { Card, Col, Container, Row } from "react-bootstrap";
import {
  SharedPageHeader,
  SharedPagination,
  SharedSearch,
} from "../../components/shared";
import { ProductList } from "../../components/products";

export default function ProductListPage() {
  const { onGets: onGetProducts, ...productList } = useProductList();

  React.useEffect(() => {
    onGetProducts();
  }, [onGetProducts]);

  return (
    <React.Fragment>
      <Container className="mb-4 mt-4">
        <SharedPageHeader title={"Products"} />
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
