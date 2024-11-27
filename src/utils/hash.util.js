import { genSaltSync, hashSync, compareSync } from "bcrypt";

const createHashUtil = (password) => {
    try {
        // Saltos de hasheo.
        const salt = genSaltSync(10);
        // Hasheo de password, devuelve contraseña hasheada.
        const hashPassword = hashSync(password, salt);
        return hashPassword;
    } catch (error) {
        throw error;
    };
};

const verifyHashUtil = (password, dbPassword) => {
    try {
        // Devuelve un boolean. TRUE si es la contraseña, FALSE si no lo es.
        const verify = compareSync(password, dbPassword);
        return verify;
    } catch (error) {
        throw error;
    };
};

export { createHashUtil, verifyHashUtil };
