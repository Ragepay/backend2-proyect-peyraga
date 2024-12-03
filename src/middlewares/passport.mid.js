import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { readByEmail, create, readById } from "../data/mongo/managers/users.manager.js";
import { createHashUtil, verifyHashUtil } from "../utils/hash.util.js";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import { createTokenUtil } from "../utils/token.util.js";

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, REDIRECT_URI } = process.env

// Estrategia de register.
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

// Estrategia de Login.
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
            req.token = createTokenUtil({
                role: user.role,
                user: user._id
            });
            //req.session.online = true;
            //req.session.email = req.body.email;
            //req.session.role = user.role;
            //req.session.user_id = user._id.toString();
            return done(null, user);
        } catch (error) {
            return done(error);
        };
    }
));

// Estrategia de Autenticacion por terceros (Register y Login).
passport.use("google", new GoogleStrategy(
    {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: REDIRECT_URI,
        passReqToCallback: true
    }, async (req, accessToken, refreshToken, profile, done) => {
        try {
            let user = await readByEmail(profile.id);
            if (!user) {
                user = {
                    email: profile.id,
                    name: profile.displayName,
                    lastName: profile.name.familyName,
                    photo: profile.picture,
                    password: createHashUtil(profile.id),
                    emailGoogle: profile.emails[0].value
                };
                user = await create(user);
            }
            req.token = createTokenUtil({
                role: user.role,
                user: user._id
            });
            //req.session.email = user.email;
            //req.session.role = user.role;
            //req.session.online = true;
            //req.session.user_id = user._id.toString();
            return done(null, user);
        } catch (error) {
            return done(error);
        };
    }
));
/*
passport.serializeUser((user, done) => {
    done(null, user.id); // Guardamos el `id` en la sesión.
});

passport.deserializeUser((id, done) => {
    readById(id, (err, user) => {
        done(err, user); // Recuperamos el usuario completo.
    });
});
*/


export default passport;