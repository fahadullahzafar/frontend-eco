const handleLogout = () => {
    try {
        localStorage.removeItem("token")
        window.location.href = "/"
        alert("Logout Successful");
    } catch (error) {
        console.log(error);
        alert("Logout Failed");
    }
};
export default handleLogout