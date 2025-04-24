import React from "react";
import { accountSignIn } from "../../services/accounts";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import {
  SharedFieldValidation,
  SharedNonFieldValidation,
} from "../../components/shared";
import { useNavigate } from "react-router-dom";

export default function AccountSignInPage() {
  const navigate = useNavigate();
  const [userError, setUserError] = React.useState(null);
  const [userLoading, setUserLoading] = React.useState(false);

  const onSignIn = async (e) => {
    e.preventDefault();

    setUserLoading(true);
    setUserError(null);

    try {
      const payload = {
        username: e.target.username.value,
        password: e.target.password.value,
      };

      const response = await accountSignIn(payload);
      console.log(response?.data);
      localStorage.setItem("token", response?.data?.token);
      navigate("/products", { replace: true });
    } catch (error) {
      console.log(error);
      setUserError(error);
    } finally {
      setUserLoading(false);
    }
  };

  return (
    <React.Fragment>
      <Container className="mt-4 mb-4">
        <SharedNonFieldValidation error={userError} />
        <Row className="d-flex justify-content-center align-items-center vh-100">
          <Col className="col-4">
            <Card>
              <Card.Body>
                <Card.Title className="mb-3">Sign In</Card.Title>

                <Form onSubmit={onSignIn}>
                  <Form.Group className="mb-3">
                    <Form.Label className="mb-2">Username</Form.Label>
                    <Form.Control disabled={userLoading} name="username" />
                    <SharedFieldValidation
                      error={userError}
                      field={"username"}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label className="mb-2">Password</Form.Label>
                    <Form.Control
                      disabled={userLoading}
                      type="password"
                      name="password"
                    />
                    <SharedFieldValidation
                      error={userError}
                      field={"password"}
                    />
                  </Form.Group>
                  <div className="d-flex justify-content-end align-items-center gap-2">
                    <Button disabled={userLoading} type="submit">
                      Sign In
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}
