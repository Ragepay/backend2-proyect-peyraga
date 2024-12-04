import passport from "passport";
// Estrategias de passport
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import { Strategy as CustomStrategy } from "passport-custom";
// Service de users.
import { readByEmail, create, readById, update } from "../data/mongo/managers/users.manager.js";
// Utils
import { createHashUtil, verifyHashUtil } from "../utils/hash.util.js"; // Hash Contraeña
import { createTokenUtil, verifyTokenUtil } from "../utils/token.util.js"; // Tokens 


const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, REDIRECT_URI } = process.env

// Estrategia de register.
// Verifica que el correo no exista en la base de datos.
// Crea un nuevo usuario hasheando contraseña.
// Retorna el usuario recien registrado.
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
                error.statusCode = 401;
                return done(error);
            }
            // Hasheo de contraseña y creacion de user.
            req.body.password = createHashUtil(password);
            const data = req.body;
            const user = await create(data);
            user.password = null;
            return done(null, user);
        } catch (error) {
            return done(error);
        };
    }
));

// Estrategia de Login.
// Busca el usuario por correo en al BBDD.
// Verifica si la contraseña ingresada coinside con el hash almacenado.
// Retorna el usuario si la utenticacion e exitosa.
// Modificar isOnline en la base de datos.
passport.use("login", new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
        try {
            // Existencia de User con ese email
            let user = await readByEmail(email);
            if (!user) {
                const error = new Error("USER NOT FOUND, INVALID EMAIL.");
                error.statusCode = 401;
                return done(error);
            }
            const dbPassword = user.password;
            const verify = verifyHashUtil(password, dbPassword);
            if (!verify) {
                const error = new Error("INVALID PASSWORD");
                error.statusCode = 401;
                return done(error);
            }
            req.token = createTokenUtil({
                role: user.role,
                user_id: user._id,
                email: user.email
            });
            //req.session.online = true;
            //req.session.email = req.body.email;
            //req.session.role = user.role;
            //req.session.user_id = user._id.toString();
            user = await update(user._id, { isOnline: true });
            user.password = null;
            return done(null, user);
        } catch (error) {
            return done(error);
        };
    }
));

// Estrategia de Admin.
// Similar a un login , pero adicionalmente verifica si el usuario tiene un rol administrativo.
// Rechaza usuarios que no tengan permisos
passport.use("admin", new CustomStrategy(
    async (req, done) => {
        try {
            const { token } = req.headers;
            const data = verifyTokenUtil(token);
            const user = await readById(data.user_id);
            const { role } = data;
            if (role !== "ADMIN") {
                const error = new Error("ACCESS DENIED: User does not have ADMIN privileges.");
                error.statusCode = 403;
                return done(error);
            }
            user.password = null;
            return done(null, user);
        } catch (error) {
            return done(error);
        };
        /*
                const { token } = req.headers;
                const data = verifyTokenUtil(token);
                const user = await readById(data.user_id);
                if (user) {
                    const message = user.email.toUpperCase() + " IS ONLINE";
                    return res.status(200).json({ message, online: true });
                } else {
                    const message = "USER IS NOT ONLINE";
                    return res.status(400).json({ message, online: false });
                
                */
    }
));

// NO FUNCIONA CON PASSPOR LOCAL, necesito passordf y email.
// Estrategia de Online.
// Valida al usuario mediante credenciales locales.
// Puede servir para controlar el estado de tiempo real de usuarios conectados en la aplicacion.
passport.use("online", new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
        try {
            // Consultar existencia del usuario.
            const { token } = req.token;
            if (!token) {
                const error = new Error("INVALID TOKEN.");
                error.statusCode = 401;
                return done(error);
            }
            const { user_id } = verifyTokenUtil(token);
            const user = await readById(user_id);
            const { isOnline } = user;
            if (!isOnline) {
                const error = new Error("USER IS NOT ONLINE");
                error.statusCode = 401;
                return done(error);
            }
            return done(null, user);
        } catch (error) {
            return done(error);
        };
    }
));

// NO FUNCIONA CON PASSPOR LOCAL, necesito passordf y email.
// Estrategia de Signout.
// Invalida tokens o sesiones activas.
// Retorna un estado que la operacion fue exitosa.
passport.use("signout", new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
        try {
            const token = req.token;
            if (!token) {
                const error = new Error("USER NOT LOGGED");
                error.statusCode = 401;
                return done(error);
            }
            delete req.token;
            return done(null, null);
        } catch (error) {
            return done(error);
        };
    }
));

// Estrategia de Autenticacion por terceros (Register y Login).
// Busca al usuario por id(de google). Si existe.
// Crea un usuario con al informacion traida de google, si no existe.
// Crea el atributo "token" de request, almacenando un token
// Crea "user" en el objeto request.
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
            const token = createTokenUtil({
                role: user.role,
                user: user._id,
                email: user.email
            });
            req.token = token;
            return done(null, { user, token },);
        } catch (error) {
            return done(error);
        };
    }
));

export default passport;