import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { useAuth0 } from "@auth0/auth0-react";
import { useProductsContext } from "../context/products_context";
import { useCartContext } from "../context/cart_context";
import CartBtn from "./CartBtn";

export default function NavBar() {
  const { isMenuOpen, openMenu, closeMenu } = useProductsContext();
  const { clearCart } = useCartContext();
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

  const handleLogout = () => {
    clearCart();
    localStorage.removeItem("user");
    logout({ returnTo: window.location.origin });
  };

  return (
    <div>
      <div className="section-center py-5">
        <div className="relative grid items-center grid-cols-2 lg:grid-cols-3">
          <ul className="flex items-center hidden space-x-8 lg:flex">
            <li>
              <Link
                to="/"
                className="font-medium tracking-wide transition-colors duration-200 hover:text-teal-accent-400"
              >
                Home
              </Link>
            </li>
            <li>
              <HashLink
                smooth
                to="/#features"
                className="font-medium tracking-wide transition-colors duration-200 hover:text-teal-accent-400"
              >
                Features
              </HashLink>
            </li>
            <li>
              <HashLink
                smooth
                to="/#new"
                className="font-medium tracking-wide transition-colors duration-200 hover:text-teal-accent-400"
              >
                New
              </HashLink>
            </li>
            <li>
              <Link
                to="/products"
                className="font-medium tracking-wide transition-colors duration-200 hover:text-teal-accent-400"
              >
                Products
              </Link>
            </li>
          </ul>

          <Link to="/" className="inline-flex items-center lg:mx-auto">
            <svg
              className="w-8 text-deep-purple-accent-400"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
            >
              <rect x="3" y="1" width="7" height="12" />
              <rect x="3" y="17" width="7" height="6" />
              <rect x="14" y="1" width="7" height="6" />
              <rect x="14" y="11" width="7" height="12" />
            </svg>
            <span className="ml-2 text-xl font-bold tracking-wide text-gray-800 uppercase">
              Reverie
            </span>
          </Link>

          <ul className="flex items-center hidden ml-auto space-x-8 lg:flex">
            <li>
              <CartBtn />
            </li>
            {isAuthenticated && (
              <li>
                <Link to="/checkout">Checkout</Link>
              </li>
            )}
            {isAuthenticated ? (
              <li>
                <button type="button" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            ) : (
              <li>
                <button type="button" onClick={loginWithRedirect}>
                  Login
                </button>
              </li>
            )}
          </ul>

          <div className="ml-auto lg:hidden">
            <button
              className="p-2 -mr-1 transition duration-200 rounded"
              onClick={openMenu}
            >
              <svg className="w-5 text-gray-600" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z"
                />
                <path
                  fill="currentColor"
                  d="M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z"
                />
                <path
                  fill="currentColor"
                  d="M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z"
                />
              </svg>
            </button>
            {isMenuOpen && (
              <div className="absolute top-0 left-0 w-full z-50">
                <div className="p-5 bg-white border rounded shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <Link
                      to="/"
                      onClick={closeMenu}
                      className="inline-flex items-center"
                    >
                      <svg
                        className="w-8 text-deep-purple-accent-400"
                        viewBox="0 0 24 24"
                      >
                        <rect x="3" y="1" width="7" height="12" />
                        <rect x="3" y="17" width="7" height="6" />
                        <rect x="14" y="1" width="7" height="6" />
                        <rect x="14" y="11" width="7" height="12" />
                      </svg>
                      <span className="ml-2 text-xl font-bold tracking-wide text-gray-800 uppercase">
                        Reverie
                      </span>
                    </Link>
                    <button className="p-2 -mt-2 -mr-2" onClick={closeMenu}>
                      <svg className="w-5 text-gray-600" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
