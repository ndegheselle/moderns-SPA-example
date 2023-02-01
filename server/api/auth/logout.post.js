export default defineEventHandler(async (event) => {
    if (req.user) {
        res.clearCookie("token");
        res.clearCookie("refresh-token");
        return { message: "Logout successfully." };
    }
});