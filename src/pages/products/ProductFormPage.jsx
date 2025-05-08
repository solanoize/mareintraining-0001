import React from "react";
import { useProductDetail, useProductUpdate } from "../../hooks/products";
import { useNavigate, useParams } from "react-router-dom";
import {
  SharedNavbarBreadcrumb,
  SharedPageHeader,
} from "../../components/shared";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import ProductForm from "../../components/products/ProductForm";
import { useCategoryList } from "../../hooks/categories";
import { CategoryOptionList } from "../../components/categories";
import useProductCreate from "../../hooks/products/useProductCreate";

export default function ProductFormPage() {
  const params = useParams();
  const navigate = useNavigate();
  const [show, setShow] = React.useState(false);
  const { onGet: onGetProduct, ...productDetail } = useProductDetail();
  const { onInit: onInitProduct, ...productUpdate } = useProductUpdate();
  const categoryList = useCategoryList();
  const productCreate = useProductCreate();

  React.useEffect(() => {
    async function initialize() {
      try {
        const response = await onGetProduct(params?.id);
        onInitProduct(response?.data);
        console.log(response?.data);
      } catch (error) {
        console.warn(error);
      }
    }

    params?.id && initialize();
  }, [onGetProduct, onInitProduct, params?.id]);

  const onUpdateProduct = async () => {
    try {
      const payload = {};
      payload.id = params?.id;
      payload.category = productUpdate.object?.category.id;
      payload.price = productUpdate.object?.price;
      payload.stock = productUpdate.object?.stock;
      payload.name = productUpdate.object?.name;
      payload.description = productUpdate.object?.description;
      await productUpdate.onUpdate(payload);
      navigate("/products", { replace: true });
    } catch (error) {
      console.warn(error);
    }
  };

  const onCreateProduct = async () => {
    try {
      const payload = {};
      payload.category = productCreate.object?.category.id;
      payload.price = productCreate.object?.price;
      payload.stock = productCreate.object?.stock;
      payload.name = productCreate.object?.name;
      payload.description = productUpdate.object?.description;
      await productCreate.onCreate(payload);
      navigate("/products", { replace: true });
    } catch (error) {
      console.warn(error);
    }
  };

  const onSaveProduct = () => {
    if (productUpdate.isUpdate) {
      onUpdateProduct();
    } else {
      onCreateProduct();
    }
  };

  const onShow = async () => {
    try {
      await categoryList.onGets();
      setShow(true);
    } catch (error) {
      console.warn(error);
    }
  };

  const onClose = () => {
    setShow(false);
  };

  const onSelectProduct = (value) => {
    if (productUpdate.isUpdate) {
      productUpdate.onSetCategory(value);
    } else {
      productCreate.onSetCategory(value);
    }
    onClose();
  };

  return (
    <React.Fragment>
      <SharedNavbarBreadcrumb />
      <Container className="mb-4 mt-4">
        <SharedPageHeader title={productDetail.object?.name} />
        <Row className="mb-3">
          <Col>
            {productUpdate.isUpdate && (
              <ProductForm
                error={productUpdate.error}
                object={productUpdate.object}
                onChange={productUpdate.onChange}
                categoryOptions={
                  <Button onClick={onShow} variant="outline-secondary">
                    Open
                  </Button>
                }
              />
            )}
            {!productUpdate.isUpdate && (
              <ProductForm
                error={productCreate.error}
                object={productCreate.object}
                onChange={productCreate.onChange}
                categoryOptions={
                  <Button onClick={onShow} variant="outline-secondary">
                    Open
                  </Button>
                }
              />
            )}
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Card>
              <Card.Body>
                <Button variant="dark" onClick={onSaveProduct}>
                  Save
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <CategoryOptionList
        collection={categoryList.collection}
        error={categoryList.error}
        onClose={onClose}
        onGets={categoryList.onGets}
        onSelect={onSelectProduct}
        pagination={categoryList.pagination}
        show={show}
      />
    </React.Fragment>
  );
}
