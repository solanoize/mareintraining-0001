import React from "react";
import { useCartCreate } from "../../hooks/carts";
import { Button, ButtonGroup, Card, Col, Row } from "react-bootstrap";
import { CartForm } from "../../components/carts";
import { SharedError } from "../../components/shared";
import { useProductList } from "../../hooks/products";
import { ProductOptionList } from "../../components/products";
import { useNavigate } from "react-router-dom";

export default function CartCreatePage() {
  const navigate = useNavigate();
  const [showProductList, setShowProductList] = React.useState(false);
  // const { refresh } = useOutletContext();
  const cartCreate = useCartCreate();
  const productList = useProductList();

  const onShowProductList = async () => {
    try {
      await productList.onGets();
      setShowProductList(true);
    } catch (error) {
      console.warn(error);
    }
  };

  const onHideProductList = () => {
    setShowProductList(false);
  };

  const onCreateCart = async () => {
    try {
      const payload = {};
      payload.product = cartCreate.object?.product?.id;
      payload.price = cartCreate.object?.product?.price;
      payload.quantity = cartCreate.object?.quantity;
      payload.discount = cartCreate.object?.discount;
      payload.discount_type = cartCreate.object?.discount_type;
      await cartCreate.onCreate(payload);
      cartCreate.onReset();
      // refresh();
      navigate("/invoices/create", { replace: true });
    } catch (error) {
      console.warn(error);
    }
  };

  const onSelectProduct = (value) => {
    cartCreate.onSetProduct(value);
    onHideProductList();
  };

  const onCloseCart = () => {
    navigate("/invoices/create/", { replace: true });
  };

  return (
    <React.Fragment>
      <Card>
        <Card.Header>Add Item</Card.Header>
        <Card.Body className="bg-light">
          <SharedError error={cartCreate.error} />
          <SharedError error={productList.error} />

          <Row className="mb-3">
            <Col>
              <CartForm.ProductField {...cartCreate}>
                <Button variant="dark" onClick={onShowProductList}>
                  Open
                </Button>
              </CartForm.ProductField>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={4}>
              <CartForm.QuantityField {...cartCreate} />
            </Col>
            <Col>
              <CartForm.DiscountField {...cartCreate}>
                <CartForm.DiscountTypeField {...cartCreate} />
              </CartForm.DiscountField>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <CartForm.DiscountedSubtotalField
                value={cartCreate.totalAfterDiscount}
              />
            </Col>
            <Col>
              <CartForm.SubtotalField value={cartCreate.subtotal} />
            </Col>
          </Row>
        </Card.Body>
        <Card.Footer>
          <ButtonGroup>
            <Button onClick={onCreateCart} variant="dark">
              Add
            </Button>
            <Button onClick={onCloseCart} variant="secondary">
              Close
            </Button>
          </ButtonGroup>
        </Card.Footer>
      </Card>

      <ProductOptionList
        collection={productList.collection}
        error={productList.error}
        onHide={onHideProductList}
        onGets={productList.onGets}
        onSelect={onSelectProduct}
        pagination={productList.pagination}
        show={showProductList}
      />
    </React.Fragment>
  );
}
