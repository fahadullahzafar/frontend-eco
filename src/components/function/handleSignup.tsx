import api from "../../api/axios";
const handleSignup = async (
  email: string,
  username: string,
  password: string,
  ConfirmPassword: string,
) => {
  if (password != ConfirmPassword) {
    alert("Password not match");
    return;
  }
  try {
    const response = await api.post("/auth/signup", {
      email,
      username,
      password,
    });
    localStorage.setItem("token", response.data.access_token);
    window.location.href = "/";

    console.log(response.data);
    alert("Signup Successful");
  } catch (error) {
    console.log(error);
    alert("Sinup Failed");
  }
};
export default handleSignup;
