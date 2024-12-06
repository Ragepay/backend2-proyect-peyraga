import { readByEmail } from "../data/mongo/managers/users.manager.js";

const isValidUser = async (req, res, next) => {
        const { email } = req.body;
        const user = await readByEmail(email);
        if (user) {
            return next();
        }
        const error = new Error("INVALID CREDENCIALS");
        error.statusCode = 401;
        throw error;
};

export default isValidUser;