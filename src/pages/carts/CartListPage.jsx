import { Outlet, useLocation, useNavigate, useOutlet } from "react-router-dom";
import { useCartList } from "../../hooks/carts";
import React from "react";
import { Button, Card, Col } from "react-bootstrap";
import { CartList } from "../../components/carts";
import {
  SharedError,
  SharedPagination,
  SharedSearch,
} from "../../components/shared";

export default function CartListPage() {
  const navigate = useNavigate();
  const location = useLocation();
  // const outlet = useOutlet();
  const { onGets: onGetCarts, ...cartList } = useCartList();

  React.useEffect(() => {
    Promise.all([onGetCarts()]);
  }, [onGetCarts, location]);

  const onUpdateCart = (value) => {
    navigate(`carts/${value?.id}/update`);
  };

  const onCreateCart = () => {
    navigate("carts/create");
  };

  return (
    <React.Fragment>
      <Card>
        <Card.Header>Items</Card.Header>
        <Card.Body>
          <SharedError error={cartList.error} />
          <div className="d-flex justify-content-between align-items-center gap-3">
            <SharedSearch onGets={onGetCarts} />
            <Button variant="dark" onClick={onCreateCart}>
              New
            </Button>
          </div>
        </Card.Body>
        <CartList collection={cartList.collection}>
          {(value) => (
            <Button variant="dark" onClick={() => onUpdateCart(value)}>
              Edit
            </Button>
          )}
        </CartList>
        <Card.Footer>
          <SharedPagination
            onGets={onGetCarts}
            pagination={cartList.pagination}
          />
        </Card.Footer>
      </Card>
    </React.Fragment>
  );
}
