import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { AccountSignInPage } from "./pages/accounts";
import { ProductCreatePage, ProductListPage } from "./pages/products";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/accounts" element={<Outlet />}>
            <Route index element={<AccountSignInPage />} />
          </Route>
          <Route path="/products" element={<Outlet />}>
            <Route index element={<ProductListPage />} />
            <Route path="create" element={<ProductCreatePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
