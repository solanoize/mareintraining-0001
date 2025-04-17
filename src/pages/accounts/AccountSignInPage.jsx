import { gql, useMutation } from "@apollo/client";
import React from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import Swal from "sweetalert2";
import LoadingIndicator from "../../components/shared/LoadingIndicator";
import { useNavigate } from "react-router-dom";

const TOKEN_AUTH = gql`
  mutation TokenAuth($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
      token
    }
  }
`;

export default function AccountSignInPage() {
  const navigate = useNavigate();
  const [tokenAuth, tokenAuthState] = useMutation(TOKEN_AUTH);

  const handleSubmitSignIn = async (e) => {
    e.preventDefault();
    try {
      const usernameValue = e.target.username.value;
      const passwordValue = e.target.password.value;

      const response = await tokenAuth({
        variables: {
          username: usernameValue,
          password: passwordValue,
        },
      });

      let token = response?.data?.tokenAuth?.token;
      localStorage.setItem("token", token);
      Swal.fire({
        title: "Sign Success!",
        text: "You are logged in.",
        icon: "success",
      });

      navigate("/", { replace: true });
    } catch (error) {
      Swal.fire({
        title: error?.message,
        text: "Ups! something wrong.",
        icon: "error",
      });
    }
  };

  return (
    <Container>
      <Row className="d-flex justify-content-center align-items-center vh-100">
        <Col className="col-4">
          <Card className="shadow">
            <Card.Body>
              <Card.Title>
                SpaceX <LoadingIndicator isLoading={tokenAuthState?.loading} />
              </Card.Title>

              <Form onSubmit={handleSubmitSignIn}>
                <Form.Group className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    disabled={tokenAuthState?.loading}
                    name="username"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    disabled={tokenAuthState?.loading}
                    name="password"
                    type="password"
                  />
                </Form.Group>

                <div>
                  <Button type="submit" disabled={tokenAuthState?.loading}>
                    Sign In
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
