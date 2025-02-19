import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  HomePage,
  SingleProductPage,
  CartPage,
  ErrorPage,
  PrivateRoute,
  CheckoutPage,
  ProductsPage,
} from "./pages";
import { Footer, NavBar } from "./components";

function App() {
  const { isLoading, error, isAuthenticated, handleRedirectCallback } =
    useAuth0();

  // Xử lý Redirect Callback khi Auth0 trả về mã token
  useEffect(() => {
    const handleAuthRedirect = async () => {
      try {
        await handleRedirectCallback();
      } catch (err) {
        console.error("Auth0 Callback Error:", err);
      }
    };

    if (
      window.location.search.includes("code=") &&
      window.location.search.includes("state=")
    ) {
      handleAuthRedirect();
    }
  }, []);

  // Nếu đang tải Auth0, hiển thị màn hình loading
  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );

  // Nếu có lỗi, hiển thị thông báo lỗi
  if (error)
    return (
      <div className="text-red-500 text-center mt-10">
        Error: {error.message}
      </div>
    );

  return (
    <div className="relative min-h-screen">
      <Router>
        <NavBar />
        <main className="min-h-screen">
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route exact path="/cart" element={<CartPage />} />
            <Route exact path="/products" element={<ProductsPage />} />
            <Route exact path="/products/:id" element={<SingleProductPage />} />
            <Route
              path="checkout"
              element={
                <PrivateRoute>
                  <CheckoutPage />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
