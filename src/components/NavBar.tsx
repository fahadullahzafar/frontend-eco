import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

function NavBar() {
  const { isLoggedIn, isAdmin, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();

  const onLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex flex-row justify-between items-center px-6 py-3 bg-green-300 shadow-md">
      <div>
        <Link to="/" className="text-xl font-bold text-gray-900">
          Kutub Farosh
        </Link>
      </div>

      <div className="flex flex-row items-center gap-x-8">
        <Link to="/" className="hover:text-green-900 transition">
          Home
        </Link>

        {isLoggedIn ? (
          <>
            <button
              onClick={onLogout}
              className="hover:text-green-900 transition cursor-pointer"
            >
              Logout
            </button>

            <Link
              to="/Cart"
              className="relative flex items-center gap-1.5 hover:text-green-900 transition font-medium"
            >
              <span>Cart</span>
              {cartCount > 0 && (
                <span className="inline-flex items-center justify-center bg-red-600 text-white text-xs font-bold rounded-full px-2 py-0.5 min-w-[20px] shadow-sm animate-pulse">
                  {cartCount}
                </span>
              )}
            </Link>

            <Link to="/Orders" className="hover:text-green-900 transition">
              Orders
            </Link>

            {isAdmin && (
              <Link
                to="/Admin"
                className="bg-green-800 text-white text-xs font-semibold px-2.5 py-1 rounded-md hover:bg-green-900 transition"
              >
                Admin
              </Link>
            )}
          </>
        ) : (
          <>
            <Link to="/Login" className="hover:text-green-900 transition">
              Log in
            </Link>

            <Link to="/Signup" className="hover:text-green-900 transition">
              Sign up
            </Link>
          </>
        )}

        <Link to="/About" className="hover:text-green-900 transition">
          About Us
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;
