import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { readByEmail, create } from "../data/mongo/managers/users.manager.js";
import { createHashUtil, verifyHashUtil } from "../utils/hash.util.js";

passport.use("register", new LocalStrategy(
    { passReqToCallback: true /* Agrega el obj de req  al callback*/, usernameField: "email" },
    async (req, email, password, done) => {
        try {
            // Validacion de data que es si o si es required:true.
            if (!email || !password) { };

            // Existencia de User con ese email
            const one = await readByEmail(email);

            // Validacion de User
            if (one) {
                const error = new Error("User already exists");
                error.statusCode = 400;
                return done(error);
            }
            // Hasheo de contraseña y creacion de user.
            req.body.password = createHashUtil(password);
            const data = req.body;
            const user = await create(data);
            return done(null, user);
        } catch (error) {
            return done(error);
        };
    }
));


passport.use("login", new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
        try {
            // Existencia de User con ese email
            const user = await readByEmail(email);
            if (!user) {
                const error = new Error("INVALID CREDENCIALS.");
                error.statusCode = 401;
                return done(error);
            }
            const dbPassword = user.password;
            const verify = verifyHashUtil(password, dbPassword);
            if (!verify) {
                const error = new Error("INVALID CREDENCIALS.");
                error.statusCode = 401;
                return done(error);
            }
            req.session.online = true;
            req.session.email = req.body.email;
            req.session.role = user.role;
            req.session.user_id = user._id;
            return done(null, user);
        } catch (error) {
            return done(error);
        };
    }
));


export default passport;