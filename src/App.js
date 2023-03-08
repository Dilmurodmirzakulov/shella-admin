import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import store from "./store/store";
import Layout from "./layout/layout";
import Menu from "./pages/menu";
import Dashboard from "./pages/dashboard";
import Products from "./pages/products";
function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Layout>
          <Routes>
            <Route path="/menu" element={<Menu />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            {/* <Route
              path="/connections"
              element={<PagesAccountSettingsConnections />}
            />
            <Route
              path="/notisfications"
              element={<PagesAccountSettingsNotifications />}
            /> */}
            {/* <Route path="/category/:category" element={<Category />} /> */}
            {/* <Route path="/product/:product" element={<Product />} /> */}
          </Routes>
        </Layout>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
