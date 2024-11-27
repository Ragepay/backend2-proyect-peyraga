import { createHashUtil } from "../utils/hash.util.js";

const createHash = (req, res, next) => {
    try {
        let { password } = req.body;
        password = createHashUtil(password);
        req.body.password = password;
        return next();
    } catch (error) {
        return next(error);
    };
};

export default createHash;
