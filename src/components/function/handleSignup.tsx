import api from "../../api/axios";

const handleSignup = async (
  email: string,
  username: string,
  password: string,
  ConfirmPassword: string,
) => {
  if (password !== ConfirmPassword) {
    return { success: false, message: "Passwords do not match" };
  }

  try {
    const response = await api.post("/auth/signup", {
      email,
      username,
      password,
    });

    return { success: true, token: response.data.access_token };
  } catch (error: any) {
    console.error("Signup error:", error);
    const message = error.response?.data?.message || "Signup Failed";
    return { success: false, message };
  }
};

export default handleSignup;
