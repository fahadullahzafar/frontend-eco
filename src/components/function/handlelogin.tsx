import api from "../../api/axios";
const handleLogin = async (login: string, password: string) => {
  try {
    const response = await api.post("/auth/login", {
      login,
      password,
    });

    console.log(response.data);

    localStorage.setItem("token", response.data.access_token);
    window.location.href = "/";

    alert("Login Successful");
  } catch (error) {
    console.log(error);
    alert("Login Failed");
  }
};
export default handleLogin;
