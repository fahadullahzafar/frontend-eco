import Button from "../components/button"
import Input from "../components/Input"
import { useState } from 'react'
import handleSignup from '../components/handleSignup'
function Signup() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    return (
        <div className="flex flex-col gap-10 items-center py-10 m-30 border-2">
            <Input
                type="Text"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}>
            </Input>
            <Input
                type="Text"
                placeholder="Enter user name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}>
            </Input>
            <Input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}>
            </Input>
            <Input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}>
            </Input>
            <Button
                className="w-2/3"
                style={{
                    fontSize: "15px",
                    borderRadius: "5px",
                }}
                onClick={() =>
                    handleSignup(
                        email,
                        username,
                        password,
                        confirmPassword
                    )}
            >
                Register
            </Button>
        </div>
    )
}
export default Signup