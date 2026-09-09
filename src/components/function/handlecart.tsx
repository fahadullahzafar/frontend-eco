import api from "../../api/axios";

export const handleCart = async (productId: string, quantity: number) => {
  console.log("Clicked, productId");

  try {
    const response = await api.post("/cart", {
      productId: productId,
      quantity: quantity,
    });

    const data = response.data;
    console.log("Cart:", data);
    console.log("quantity:", quantity);
    return data;
  } catch (error) {
    console.log("Error come:", error);
    console.error("Add to cart error:", error);
    return null;
  }
};
