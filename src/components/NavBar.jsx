import { Link } from "react-router-dom"; // Link component for navigation
import { HashLink } from "react-router-hash-link"; // HashLink for smooth scrolling to sections
import { useUserContext } from "../context/user_context"; // Import user context
import { useProductsContext } from "../context/products_context"; // Import products context
import { useCartContext } from "../context/cart_context"; // Import cart context
import CartBtn from "./CartBtn"; // Import cart button component

export default function NavBar() {
  // Extract values from contexts
  const { isMenuOpen, openMenu, closeMenu } = useProductsContext(); // Menu state handlers
  const { clearCart } = useCartContext(); // Function to clear the cart
  const { loginWithRedirect, myUser, logout } = useUserContext(); // Authentication handlers

  return (
    <div>
      <div className="section-center py-5">
        <div className="relative grid items-center grid-cols-2 lg:grid-cols-3">
          {/* Desktop Navigation Links */}
          <ul className="flex items-center hidden space-x-8 lg:flex">
            <li>
              <Link
                to="/"
                aria-label="HomePage"
                title="HomePage"
                className="font-medium tracking-wide transition-colors duration-200 hover:text-teal-accent-400"
              >
                Home
              </Link>
            </li>
            <li>
              <HashLink
                smooth
                to="/#features"
                aria-label="Our featured products"
                title="Our featured products"
                className="font-medium tracking-wide transition-colors duration-200 hover:text-teal-accent-400"
              >
                Features
              </HashLink>
            </li>
            <li>
              <HashLink
                smooth
                to="/#new"
                aria-label="Our new product"
                title="Our new product"
                className="font-medium tracking-wide transition-colors duration-200 hover:text-teal-accent-400"
              >
                New
              </HashLink>
            </li>
            <li>
              <Link
                to="/products"
                aria-label="All products"
                title="All products"
                className="font-medium tracking-wide transition-colors duration-200 hover:text-teal-accent-400"
              >
                Products
              </Link>
            </li>
          </ul>

          {/* Logo Section */}
          <Link
            to="/"
            aria-label="HomePage"
            title="HomePage"
            className="inline-flex items-center lg:mx-auto"
          >
            {/* Logo SVG */}
            <svg
              className="w-8 text-deep-purple-accent-400"
              viewBox="0 0 24 24"
              strokeWidth="2"
              strokeMiterlimit="10"
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

          {/* Right-side Navigation (Cart & Authentication) */}
          <ul className="flex items-center hidden ml-auto space-x-8 lg:flex">
            <li>
              <CartBtn /> {/* Cart button */}
            </li>
            {myUser && (
              <li>
                <Link to="/checkout">Checkout</Link>
              </li>
            )}
            {myUser ? (
              <li>
                <button
                  type="button"
                  onClick={() => {
                    clearCart(); // Clear cart on logout
                    localStorage.removeItem("user"); // Remove user from localStorage
                    logout({
                      logoutParams: { returnTo: window.location.origin },
                    });
                  }}
                >
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

          {/* Mobile Navigation Menu */}
          <div className="ml-auto lg:hidden">
            {/* Mobile Menu Button */}
            <button
              aria-label="Open Menu"
              title="Open Menu"
              className="p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline hover:bg-deep-purple-50 focus:bg-deep-purple-50"
              onClick={() => openMenu()}
            >
              {/* Hamburger Icon */}
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

            {/* Mobile Menu Dropdown */}
            {isMenuOpen && (
              <div className="absolute top-0 left-0 w-full z-50">
                <div className="p-5 bg-white border rounded shadow-sm">
                  {/* Header with Logo & Close Button */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <Link
                        to="/"
                        onClick={() => closeMenu()}
                        aria-label="Company"
                        title="Company"
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
                    </div>
                    <div>
                      <button
                        aria-label="Close Menu"
                        title="Close Menu"
                        className="p-2 -mt-2 -mr-2 transition duration-200 rounded hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                        onClick={() => closeMenu()}
                      >
                        {/* Close Icon */}
                        <svg className="w-5 text-gray-600" viewBox="0 0 24 24">
                          <path
                            fill="currentColor"
                            d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3 
                            c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 
                            c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Mobile Navigation Links */}
                  <nav>
                    <ul className="space-y-4">
                      <li>
                        <Link to="/" onClick={() => closeMenu()}>
                          Home
                        </Link>
                      </li>
                      {/* Other menu items */}
                    </ul>
                  </nav>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
