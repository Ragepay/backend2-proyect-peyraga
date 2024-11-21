import { readByEmail } from "../data/mongo/managers/users.manager.js";

const isVerifyPassword = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await readByEmail(email);
        if (user) {
            const verify = (password === user.password);
            if (verify) {
                return next();
            }
            const message = "INVALID CREDENCIALS";
            return res.status(401).json({ message });
        } else {
            const message = "USER NOT FOUND";
            return res.status(401).json({ message });
        }
    } catch (error) {
        return next(error);
    };
};

export default isVerifyPassword;