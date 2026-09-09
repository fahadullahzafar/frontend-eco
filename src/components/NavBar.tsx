import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

function NavBar() {
  const { isLoggedIn, isAdmin, user, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const [adminDropdownOpen, setAdminDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isAdminRoute = location.pathname.toLowerCase().startsWith("/admin");

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setAdminDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close dropdown when route changes
  useEffect(() => {
    setAdminDropdownOpen(false);
  }, [location.pathname]);

  const onLogout = () => {
    logout();
    navigate("/");
  };

  // 1. ADMIN PANEL VIEW: Simpler, admin-specific navigation
  if (isAdminRoute) {
    return (
      <nav className="fixed top-0 left-0 w-full z-50 flex flex-row justify-between items-center px-6 py-3 bg-slate-900 text-white shadow-md border-b border-slate-800">
        <div className="flex items-center gap-3">
          <Link
            to="/Admin"
            className="text-xl font-bold text-white hover:text-emerald-300 transition"
          >
            Kutub Farosh
          </Link>
          <span className="rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold px-2.5 py-0.5 tracking-wide">
            Admin Workspace
          </span>
        </div>

        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="flex items-center gap-1.5 text-xs font-semibold text-emerald-300 bg-emerald-950/70 hover:bg-emerald-900/90 px-3.5 py-1.5 rounded-xl border border-emerald-700/40 transition shadow-2xs"
          >
            <span>🏪</span>
            <span>Customer View</span>
          </Link>

          <span className="hidden sm:inline text-xs text-gray-400 font-medium">
            Admin:{" "}
            <strong className="text-gray-200">
              {user?.username || "Administrator"}
            </strong>
          </span>

          <button
            onClick={onLogout}
            className="text-xs font-semibold text-red-400 hover:text-red-300 bg-red-950/30 hover:bg-red-900/50 px-3.5 py-1.5 rounded-xl border border-red-800/30 transition cursor-pointer"
          >
            Logout
          </button>
        </div>
      </nav>
    );
  }

  // 2. STORE / CUSTOMER VIEW: Standard store navigation with Admin Dropdown/Toggle
  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex flex-row justify-between items-center px-6 py-3 bg-green-300 shadow-md">
      <div>
        <Link to="/" className="text-xl font-bold text-gray-900">
          Kutub Farosh
        </Link>
      </div>

      <div className="flex flex-row items-center gap-x-7">
        <Link to="/" className="hover:text-green-900 font-medium transition">
          Home
        </Link>

        {isLoggedIn ? (
          <>
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

            <Link
              to="/Orders"
              className="hover:text-green-900 font-medium transition"
            >
              Orders
            </Link>

            {/* ADMIN DROPDOWN / TOGGLE */}
            {isAdmin && (
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setAdminDropdownOpen(!adminDropdownOpen)}
                  className="flex items-center gap-1.5 rounded-full bg-emerald-800 text-white text-xs font-semibold px-3 py-1.5 hover:bg-emerald-900 transition shadow-xs cursor-pointer active:scale-95"
                  title="Admin Controls"
                >
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping inline-block"></span>
                  <span>Admin</span>
                  <span className="text-[10px] text-emerald-300 ml-0.5">
                    {adminDropdownOpen ? "▲" : "▼"}
                  </span>
                </button>

                {adminDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-52 rounded-2xl bg-white p-2 shadow-xl border border-gray-200 z-50 animate-in fade-in zoom-in-95 duration-100">
                    <div className="px-3 py-2 border-b border-gray-100">
                      <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                        Admin Controls
                      </p>
                      <p className="text-xs font-bold text-gray-800 truncate">
                        {user?.username || "Admin"}
                      </p>
                    </div>

                    <div className="py-1 space-y-0.5">
                      <Link
                        to="/Admin"
                        onClick={() => setAdminDropdownOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-gray-800 hover:bg-emerald-50 hover:text-emerald-700 transition"
                      >
                        <span>⚡</span>
                        <span>Open Admin Panel</span>
                      </Link>

                      <Link
                        to="/Orders"
                        onClick={() => setAdminDropdownOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-gray-600 hover:bg-gray-100 transition"
                      >
                        <span>📦</span>
                        <span>Manage Orders</span>
                      </Link>
                    </div>

                    <div className="border-t border-gray-100 pt-1">
                      <button
                        onClick={onLogout}
                        className="w-full flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold text-red-600 hover:bg-red-50 transition cursor-pointer"
                      >
                        <span>🚪</span>
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {!isAdmin && (
              <button
                onClick={onLogout}
                className="hover:text-green-900 font-medium transition cursor-pointer"
              >
                Logout
              </button>
            )}
          </>
        ) : (
          <>
            <Link
              to="/Login"
              className="hover:text-green-900 font-medium transition"
            >
              Log in
            </Link>

            <Link
              to="/Signup"
              className="hover:text-green-900 font-medium transition"
            >
              Sign up
            </Link>
          </>
        )}

        <Link
          to="/About"
          className="hover:text-green-900 font-medium transition"
        >
          About Us
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;
