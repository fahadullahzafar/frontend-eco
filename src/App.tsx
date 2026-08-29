import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Cart from "./pages/Cart"
import Login from "./pages/Login"
import SignUp from "./pages/Signup"
import './App.css'
import NavBar from "./components/NavBar"

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route
          path="/cart"
          element={<Cart />} />
        <Route
          path="/"
          element={<Home />} />
        <Route
          path="/Login"
          element={<Login />} />
        <Route
          path="/Signup"
          element={<SignUp />} />

      </Routes>

    </BrowserRouter>
  )
}

export default App
