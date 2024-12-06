import { createHashUtil } from "../utils/hash.util.js";

const createHash = (req, res, next) => {
    let { password } = req.body;
    password = createHashUtil(password);
    req.body.password = password;
    return next();
};

export default createHash;
