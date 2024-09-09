export const auth = localStorage.getItem("token") ?? null;

export const deleteToken = () => {
    console.log("Token deleted");
    localStorage.removeItem("token");
    window.location.reload();
    
}