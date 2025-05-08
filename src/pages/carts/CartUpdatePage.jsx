import { useNavigate, useParams } from "react-router-dom";
import { useCartDetail, useCartUpdate } from "../../hooks/carts";
import React from "react";
import { Button, ButtonGroup, Card, Col, Row } from "react-bootstrap";
import { CartForm } from "../../components/carts";
import { SharedError } from "../../components/shared";

export default function CartUpdatePage() {
  const navigate = useNavigate();
  const params = useParams();

  const { onGet: onGetCart, ...cartDetail } = useCartDetail();
  const { onInit: onInitCart, ...cartUpdate } = useCartUpdate();

  React.useEffect(() => {
    const initialize = async () => {
      try {
        const response = await onGetCart(params?.cartId);
        onInitCart(response?.data);
      } catch (error) {
        console.warn(error);
      }
    };

    params?.cartId && initialize();
  }, [onGetCart, onInitCart, params?.cartId]);

  const onUpdateCart = async () => {
    try {
      const payload = {};
      payload.id = cartUpdate.object?.id;
      payload.product = cartUpdate.object?.product?.id;
      payload.price = cartUpdate.object?.product?.price;
      payload.quantity = cartUpdate.object?.quantity;
      payload.discount = cartUpdate.object?.discount;
      payload.discount_type = cartUpdate.object?.discount_type;
      await cartUpdate.onUpdate(payload);
      navigate("/invoices/create", { replace: true });
    } catch (error) {
      console.warn(error);
    }
  };

  const onCloseCart = () => {
    navigate("/invoices/create", { replace: true });
  };

  return (
    <React.Fragment>
      <Card>
        <Card.Header>{cartDetail.object?.product?.name}</Card.Header>
        <Card.Body className="bg-light">
          <SharedError error={cartUpdate.error} />
          <Row className="mb-3">
            <Col md={4}>
              <CartForm.QuantityField {...cartUpdate} />
            </Col>
            <Col>
              <CartForm.DiscountField {...cartUpdate}>
                <CartForm.DiscountTypeField {...cartUpdate} />
              </CartForm.DiscountField>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <CartForm.DiscountedSubtotalField
                value={cartUpdate.totalAfterDiscount}
              />
            </Col>
            <Col>
              <CartForm.SubtotalField value={cartUpdate.subtotal} />
            </Col>
          </Row>
        </Card.Body>
        <Card.Footer>
          <ButtonGroup>
            <Button onClick={onUpdateCart} variant="dark">
              Save
            </Button>
            <Button onClick={onCloseCart} variant="secondary">
              Close
            </Button>
          </ButtonGroup>
        </Card.Footer>
      </Card>
    </React.Fragment>
  );
}
