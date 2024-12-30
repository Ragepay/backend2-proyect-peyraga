import dao from "../dao/index.factory.js";
const { UsersManager } = dao;

async function verify(email, code) {
    const user = await UsersManager.readByEmail(email);
    if (code === user.verifyCode) {
        await UsersManager.update(user._id, { verify: true })
        return true
    } else {
        return false
    }
};

export {
    verify
};