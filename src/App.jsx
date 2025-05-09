import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { AccountSignInPage } from "./pages/accounts";
import { ProductFormPage, ProductListPage } from "./pages/products";
import {
  InvoiceCreatePage,
  InvoiceDetailPage,
  InvoiceListPage,
} from "./pages/invoices";
import { CartCreatePage, CartListPage, CartUpdatePage } from "./pages/carts";
import { PaymentFormPage } from "./pages/payments";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/accounts" element={<Outlet />}>
            <Route index element={<AccountSignInPage />} />
          </Route>
          <Route path="/products" element={<Outlet />}>
            <Route path="" element={<ProductListPage />} />
            <Route path="create" element={<ProductFormPage />} />
            <Route path=":id/update" element={<ProductFormPage />} />
          </Route>

          <Route path="invoices" element={<InvoiceListPage />}>
            <Route path="" element={<InvoiceCreatePage />}>
              <Route index element={<CartListPage />} />
              <Route path="carts/create" element={<CartCreatePage />} />
              <Route path="carts/:cartId/update" element={<CartUpdatePage />} />
            </Route>

            <Route path=":id/detail" element={<InvoiceDetailPage />}>
              <Route index element={<PaymentFormPage />} />
            </Route>
          </Route>
          {/* <Route path="*" element={<h1>404 Ups!</h1>} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
