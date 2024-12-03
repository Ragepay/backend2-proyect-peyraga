import jwt from "jsonwebtoken";
const { SECRET_KEY } = process.env;

const createTokenUtil = (data) => {
    const token = jwt.sign(data, SECRET_KEY, { expiresIn: 60 * 60 * 24 * 7 });
    return token; // Devuelve un token(string).
};

const verifyTokenUtil = (token) => {
    const verifyData = jwt.verify(token, SECRET_KEY);
    return verifyData; // Devuelve un booleano.
};

export { verifyTokenUtil, createTokenUtil }

