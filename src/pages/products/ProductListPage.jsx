import { gql, useQuery } from "@apollo/client";
import {
  Badge,
  Button,
  ButtonGroup,
  Card,
  Col,
  Container,
  ListGroup,
  Row,
} from "react-bootstrap";
import { FaBox, FaPlus, FaSave } from "react-icons/fa";
import ProductCreate from "../../components/products/ProductCreate";
import React from "react";
import ProductDetail from "../../components/products/ProductDetail";

const QUERY_PRODUCTS = gql`
  query Products {
    products {
      id
      name
      price
      stock
    }
  }
`;

function ProductList({ products, selected, callback }) {
  return (
    <>
      {products?.map((value) => (
        <ListGroup.Item
          key={value?.id}
          action
          active={selected?.id === value?.id}
          onClick={() => {
            callback && callback(value);
          }}
          className="d-flex justify-content-between align-items-start"
        >
          <div>
            <div className="fw-bold">{value?.name}</div>
            {value?.price}
          </div>
          <Badge>{value?.stock}</Badge>
        </ListGroup.Item>
      ))}
    </>
  );
}

export default function ProductListPage() {
  const queryProductsState = useQuery(QUERY_PRODUCTS);
  const [productSelected, setProductSelected] = React.useState(null);

  const handleSelectProduct = (value) => {
    if (productSelected?.id === value?.id) {
      setProductSelected(null);
      return;
    }

    const { __typename, ...rest } = value;
    setProductSelected(rest);
  };

  return (
    <Container className="mb-4 mt-4">
      <Row>
        <Col>
          <Card className="shadow">
            <Card.Body>
              <Card.Title>
                <FaBox /> Products
              </Card.Title>
            </Card.Body>
            <ListGroup variant="flush">
              <ListGroup.Item className="d-flex justify-content-end align-items-start">
                <ButtonGroup>
                  <ProductDetail
                    product={productSelected}
                    title={"Detail"}
                    callback={() => {
                      queryProductsState?.refetch();
                    }}
                  />
                  <ProductCreate
                    title={"New"}
                    callback={() => {
                      queryProductsState?.refetch();
                    }}
                  />
                </ButtonGroup>
              </ListGroup.Item>
              <ProductList
                products={queryProductsState?.data?.products}
                callback={handleSelectProduct}
                selected={productSelected}
              />
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
