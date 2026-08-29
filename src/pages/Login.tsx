import Button from "../components/button"
import Input from "../components/Input"
import handleLogin from '../components/handlelogin'
import { useState } from "react"

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    return (
        <div className="flex flex-col gap-10 items-center py-10 m-30 border-2">
            <Input
                placeholder="Enter Email or Username"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}>
            </Input>
            <Input
                placeholder="Enter Your Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}>
            </Input>
            <Button
                className="w-2/3"
                style={{
                    fontSize: "15px",
                    borderRadius: "5px",
                }}
                onClick={() =>
                    handleLogin(
                        email,
                        password
                    )}
            >
                Login
            </Button>
        </div>
    )
}
export default Login