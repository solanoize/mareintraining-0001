import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import AccountSignInPage from "./pages/accounts/AccountSignInPage";
import ProductListPage from "./pages/products/ProductListPage";

// {/* TODO: add layout */}
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/accounts" element={<Outlet />}>
            <Route index element={<AccountSignInPage />} />
          </Route>
          <Route path="/" element={<Outlet />}>
            <Route index element={<ProductListPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
