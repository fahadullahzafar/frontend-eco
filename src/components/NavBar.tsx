import { Link } from "react-router-dom";
import handleLogout from "./function/handlelogout ";

function NavBar() {
  const token = localStorage.getItem("token");

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex flex-row justify-between items-center px-6 py-3 bg-green-300 shadow-md">
      <div>
        <h2 className="text-xl font-bold">Kutub Farosh</h2>
      </div>

      <div className="flex flex-row items-center gap-x-10">
        <Link to="/">Home</Link>

        {token ? (
          <>
            <Link to="/" onClick={handleLogout}>
              Logout
            </Link>

            <Link to="/Cart">Cart</Link>
            <Link to="/Orders">Orders</Link>
          </>
        ) : (
          <>
            <Link to="/Login">Log in</Link>

            <Link to="/Signup">Sign up</Link>
          </>
        )}

        <Link to="/About">About Us</Link>
      </div>
    </nav>
  );
}

export default NavBar;
