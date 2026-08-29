import { Link } from "react-router-dom"
import handleLogout from "./handlelogout "
function NavBar() {
    const token = localStorage.getItem("token")
    return (
        < nav className="flex flex-row justify-between p-2.5 bg-green-300" >
            <div>
                <h2>Kutub Farosh</h2>
            </div>
            <div className="flex flex-row justify-between gap-x-10 ">
                <Link to="/">Home</Link>
                {token ? (<>
                    <Link to="/" onClick={handleLogout}>Logout</Link>
                    <Link to="/Cart">Cart</Link></>) : (
                    <>
                        <Link to="/Login">Log in</Link>
                        <Link to="/Signup">Sign up</Link>
                    </>
                )}
                <Link to="/About">About US</Link>

            </div>


        </nav >
    )
}
export default NavBar