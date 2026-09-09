import api from "../../api/axios";

const handleReset = async (productId: string) => {
  try {
    console.log("Reset products id:", productId);
    const response = await api.delete(`/cart/${productId}`);

    const data = response.data;

    console.log("updated Cart:", data);
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
export default handleReset;
