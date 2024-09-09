export const auth = localStorage.getItem("token") ?? null;

export const deleteToken = () => {
    localStorage.removeItem("token");
    window.location.reload();
}