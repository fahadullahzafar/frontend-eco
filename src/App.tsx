import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import './App.css';
import NavBar from "./components/NavBar";
import ProductPage from "./pages/ProductPage";
import About from "./pages/AboutUS";
import Orders from "./pages/Order";
import ProtectedRoute from "./components/protectedRoute";
import Admin from "./pages/Admin";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <NavBar />
          <main className="pt-16">
            <Routes>
              <Route path="/Admin" element={<Admin />} />
              <Route path="/" element={<Home />} />
              <Route path="/Login" element={<Login />} />
              <Route path="/Signup" element={<SignUp />} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/About" element={<About />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/cart" element={<Cart />} />
                <Route path="/orders" element={<Orders />} />
              </Route>
            </Routes>
          </main>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
