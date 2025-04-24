import React from "react";
import { useProductCommit, useProductLookup } from "../../hooks/products";
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

function ProductFieldName(props) {
  return (
    <Form.Group>
      <Form.Label>Name</Form.Label>
      <Form.Control
        name="name"
        type="text"
        onChange={props.productCommit.onChange}
        value={props.productCommit.object?.name || ""}
      />
    </Form.Group>
  );
}

function ProductForm(props) {
  const fieldName = {
    label: "Name",
    name: "name",
    options: {
      onChange: props.productCommit.onChange,
      value: props.productCommit.object?.name,
    },
  };
  return (
    <React.Fragment>
      <Row className="mb-3">
        <Col>
          <SharedInput.Text data={fieldName}>
            <SharedFieldValidation
              error={props.productCommit.errorCreate}
              field={"category"}
            />
          </SharedInput.Text>

          {/* <ProductFieldName productCommit={props.productCommit} /> */}
          <SharedTextBox
            label={"Name"}
            name={"name"}
            options={{
              onChange: props.productCommit.onChange,
              value: props.productCommit.object?.name,
            }}
          >
            <SharedFieldValidation
              error={props.productCommit.errorCreate}
              field={"category"}
            />
          </SharedTextBox>
        </Col>
        <Col>
          <SharedTextBox
            label={"Category"}
            name={"category"}
            options={{
              readOnly: true,
              defaultValue:
                props.productCommit.object?.meta?.category?.name || "",
            }}
          >
            <SharedFieldValidation
              error={props.productCommit.errorCreate}
              field={"category"}
            />
          </SharedTextBox>
          {/* <Form.Group>
            <Form.Label>Category</Form.Label>
            <Form.Control
              name="category"
              type="text"
              readOnly
              defaultValue={
                props.productCommit.object?.meta?.category?.name || ""
              }
            />
          </Form.Group> */}
        </Col>
      </Row>

      <Row className="mb-3">
        <Col>
          <Form.Group>
            <Form.Label>Price</Form.Label>
            <Form.Control
              name="price"
              type="number"
              value={props.productCommit.object?.price || ""}
              onChange={props.productCommit.onChange}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label>Stock</Form.Label>
            <Form.Control
              name="stock"
              type="number"
              value={props.productCommit.object?.stock || ""}
              onChange={props.productCommit.onChange}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              name="description"
              value={props.productCommit.object?.description || ""}
              onChange={props.productCommit.onChange}
              as={"textarea"}
              rows={3}
            />
          </Form.Group>
        </Col>
      </Row>
    </React.Fragment>
  );
}

function ProductFormAction(props) {
  return (
    <React.Fragment>
      <Button
        onClick={props.onProductCreateOrUpdate}
        disabled={props.productCommit.loading}
        className="me-2"
        variant="dark"
      >
        <FaSave /> Save
      </Button>
      <Button
        disabled={props.productCommit.loading}
        onClick={props.productCommit.onReset}
        variant="dark"
      >
        <FaCircleXmark /> Clear
      </Button>
    </React.Fragment>
  );
}

export default function ProductListPage() {
  const { onGets, ...productLookup } = useProductLookup();
  const productCommit = useProductCommit();

  React.useEffect(() => {
    onGets();
  }, [onGets]);

  const onUpdateProduct = () => {
    return productCommit.onUpdate(productCommit.object);
  };

  const onCreateProduct = () => {
    return productCommit.onCreate(productCommit.object);
  };

  const onProductCreateOrUpdate = async () => {
    if (productCommit.isDetail) {
      await onUpdateProduct();
    } else {
      await onCreateProduct();
    }
    productCommit.onReset();
    await onGets();
  };

  return (
    <React.Fragment>
      <SharedNavbarBreadcrumb />
      <Container className="mt-4 mb-4">
        <SharedPageHeader title={"Product Management"} />

        <Row className="mb-3">
          {/* dimari boskuu */}
          <Col>
            <Card>
              <Card.Header className="d-flex justify-content-between align-items-center gap-3">
                <SharedSearch onGets={onGets} />
                <SharedPagination
                  onGets={onGets}
                  pagination={productLookup.pagination}
                />
              </Card.Header>
              <Table striped="columns" hover borderless>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {productLookup.collection?.map((value) => (
                    <tr key={value?.id}>
                      <td>{value?.id}</td>
                      <td>{value?.name}</td>
                      <td>{value?.price}</td>
                      <td>{value?.stock}</td>
                      <td>
                        <Button
                          variant="dark"
                          size="sm"
                          onClick={() => productCommit.onSelect(value)}
                        >
                          <FaShare />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card>
          </Col>
          {/* Tambahan CRUD */}
          <Col md={5}>
            <Card bg="light">
              <Card.Body>
                <ProductForm productCommit={productCommit} />
              </Card.Body>
              <Card.Footer>
                <ProductFormAction
                  productCommit={productCommit}
                  onProductCreateOrUpdate={onProductCreateOrUpdate}
                />
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}
