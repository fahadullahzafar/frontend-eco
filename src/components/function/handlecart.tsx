export const handleCart = async (productId: string, quantity: number) => {
  console.log("Clicked, productId");

  try {
    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:3000/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        productId: productId,
        quantity: quantity,
      }),
    });

    const data = await response.json();
    console.log("Cart:", data);
    console.log("quantity:", quantity);
    return data;
  } catch (error) {
    console.log("Error come:", error);
    console.error("Add to cart error:", error);
    return null;
  }
};
