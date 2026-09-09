import api from "../../api/axios";

const handleLogin = async (login: string, password: string) => {
  try {
    const response = await api.post("/auth/login", {
      login,
      password,
    });

    return { success: true, token: response.data.access_token };
  } catch (error: any) {
    console.error("Login error:", error);
    const message = error.response?.data?.message || "Login Failed";
    return { success: false, message };
  }
};

export default handleLogin;
