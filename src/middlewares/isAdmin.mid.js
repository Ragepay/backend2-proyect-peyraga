import { verifyTokenUtil } from "../utils/token.util.js";

const isAdmin = async (req, res, next) => {
    const token = req?.cookies?.token;
    const data = verifyTokenUtil(token);
    if (data.role !== "ADMIN") {
        return res.status(403).json({ message: "ACCESS DENIED: YOU ARE NOT ADMIN." })
    }
    return next();
};

export default isAdmin;
