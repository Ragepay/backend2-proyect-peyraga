import { readByEmail } from "../data/mongo/managers/users.manager.js";


const isUser = async (req, res, next) => {
        const { email } = req.body;
        const user = await readByEmail(email);
        if (user) {
            const error = new Error("User already exists");
            error.statusCode = 400;
            throw error;
        }
        return next();
}

export default isUser;