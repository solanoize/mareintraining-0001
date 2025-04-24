import React from "react";
import {
  useProductCommit,
  useProductList,
  useProductLookup,
} from "../../hooks/products";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Table,
} from "react-bootstrap";
import {
  SharedFieldValidation,
  SharedInput,
  SharedNavbarBreadcrumb,
  SharedPageHeader,
  SharedPagination,
  SharedSearch,
  SharedTextBox,
} from "../../components/shared";
import { FaSave, FaShare } from "react-icons/fa";
import { FaCircleXmark } from "react-icons/fa6";
import { ProductList } from "../../components/products";

export default function ProductListPage() {
  const { onGets: onGetProducts, ...productList } = useProductList();

  React.useEffect(() => {
    onGetProducts();
  }, [onGetProducts]);

  return (
    <React.Fragment>
      <Container className="mb-4 mt-4">
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
