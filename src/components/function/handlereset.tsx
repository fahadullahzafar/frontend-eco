const handleReset = async (productId: string) => {
  const token = localStorage.getItem("token");

  try {
    console.log("Reset products id:", productId);
    const response = await fetch(`http://localhost:3000/cart/${productId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to reset cart item");
    }

    const data = await response.json();

    console.log("updated Cart:", data);
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
export default handleReset;
