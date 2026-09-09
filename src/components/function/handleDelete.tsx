const handleDelete = async (id: string) => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(`http://localhost:3000/products/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Delete failed");
    }

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export default handleDelete;
