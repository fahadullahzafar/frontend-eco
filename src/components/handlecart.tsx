export const handleCart = async (productId: string) => {
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
            }),
        });

        const data = await response.json();

        console.log("Cart:", data);
    } catch (error) {
        console.error("Add to cart error:", error);
    }
};