import api from "../../api/axios";

const handleDelete = async (id: string) => {
  try {
    await api.delete(`/products/${id}`);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export default handleDelete;
