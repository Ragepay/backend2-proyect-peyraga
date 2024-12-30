import passport from "passport";
// Estrategias de passport
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
//import { Strategy as CustomStrategy } from "passport-custom";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
// Import dao
import dao from "../dao/index.factory.js";
// Utils
import { createHashUtil, verifyHashUtil } from "../utils/hash.util.js"; // Hash Contraeña
import { createTokenUtil } from "../utils/token.util.js"; // Tokens 
import envUtil from "../utils/env.util.js";
import { sendSms, sendWhatsappMessage } from "../utils/twilio.util.js";
import { sendVerifyEmail } from "../utils/nodemailer.util.js";
import crypto from "crypto";
// Destructuring de variables de entorno.
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, REDIRECT_URI, SECRET_KEY } = envUtil;
// Destructuring UsersManager of dao.
const { UsersManager } = dao;

// Estrategia de register.
// Verifica que el correo no exista en la base de datos.
// Crea un nuevo usuario hasheando contraseña.
// Retorna el usuario recien registrado.
passport.use("register", new LocalStrategy(
    { passReqToCallback: true /* Agrega el obj de req  al callback*/, usernameField: "email" },
    async (req, email, password, done) => {
        try {
            // Validacion de data que es si o si es required:true.
            if (!email || !password) {/* BAD REQUEST */ };
            // Existencia de User con ese email
            const existUser = await UsersManager.readByEmail(email);
            // Validacion de User
            if (existUser) {
                const info = { message: "USER ALREADY EXISTS.", statusCode: 401 }
                return done(null, false, info);
            }
            // Hasheo de contraseña y creacion de user.
            req.body.password = createHashUtil(password);
            // Creacion del codigo de verificacion
            const verifyCode = crypto.randomBytes(12).toString("hex");
            const data = { ...req.body, verifyCode, photo: `https://ui-avatars.com/api/?background=random&name=${email}` };
            const user = await UsersManager.create(data);
            // Enviar mensaje SMS mediante twilio por registro.
            //await sendWhatsappMessage(user.phone);
            // Enviar email de verificacion.
            await sendVerifyEmail({ to: user.email, verifyCode });
            // Devolvemos user en el objeto req.user.
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
            // Existencia del User con ese email.
            let user = await UsersManager.readByEmail(email);
            // SI no existe, la respuesta.
            if (!user) {
                const info = { message: "USER NOT FOUND, INVALID EMAIL.", statusCode: 401 }
                return done(null, false, info);
            }
            // Obtenemos la contraseña hasheada dentro de la Base de datos.
            const dbPassword = user.password;
            // Verificamos compatibilidad. {Password desde la BBDD} vs {password req.body}.
            const verifyHash = verifyHashUtil(password, dbPassword);
            // Si no es compatible, la respuesta.
            if (!verifyHash) {
                const info = { message: "INVALID PASSWORD", statusCode: 401 }
                return done(null, false, info);
            }
            // Creamos el token, con la informacion que queramos.
            const token = createTokenUtil({
                role: user.role,
                user_id: user._id,
                email: user.email
            });
            // Lo almacenamos en req.token. Para posterior manipulación. 
            req.token = token;
            // Al user lo ponemos online. Actualizando su propiedad isOnline mediante un update.
            user = await UsersManager.update(user._id, { isOnline: true });
            // Devolvemos user en el objeto req.user.
            return done(null, user);
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
            // Verificamos si existe algun otro user con el mismo id de google.
            let user = await UsersManager.readByEmail(profile.id);
            // Si no existe, creamos el user.
            if (!user) {
                const verifyCode = crypto.randomBytes(12).toString("hex");
                user = {
                    email: profile.id,
                    name: profile.displayName,
                    lastName: profile.name.familyName,
                    photo: profile.picture,
                    password: createHashUtil(profile.id),
                    emailGoogle: profile.emails[0].value,
                    verifyCode
                };
                // Creamos el user.
                user = await UsersManager.create(user);
            }
            // Creamos el token, con la informacion que queramos.
            const token = createTokenUtil({
                role: user.role,
                user_id: user._id,
                email: user.email
            });
            // Lo almacenamos en req.token. Para posterior manipulación. 
            req.token = token;
            // Al user lo ponemos online. Actualizando su propiedad isOnline mediante un update. Y le damos verificar, ya qeu se logueo con google.
            user = await UsersManager.update(user._id, { isOnline: true, verify: true });
            // Devolvemos user en el objeto req.user.
            return done(null, user);
        } catch (error) {
            return done(error);
        };
    }
));

// Estrategia de Admin.
// Similar a un login , pero adicionalmente verifica si el usuario tiene un rol administrativo.
// Rechaza usuarios que no tengan permisos
passport.use("admin", new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromExtractors([(req => req?.cookies?.token)]),
    secretOrKey: SECRET_KEY
}, async (data, done) => {
    try {
        // Obtenemos el user mediante el id.
        const user = await UsersManager.readById(data.user_id);
        // Destructuramos el rol.
        const { role } = data;
        // Si es distinto a "ADMIN", respuesta. Si es igual, lo deja pasar.
        if (role !== "ADMIN") {
            const info = { message: "ACCESS DENIED: User does not have ADMIN privileges.", statusCode: 403 }
            return done(null, false, info);
        }
        // Devolvemos user en el objeto req.user.
        return done(null, user);
    } catch (error) {
        return done(error);
    };
}
));

// NO FUNCIONA CON PASSPOR LOCAL, necesito passordf y email.
// Estrategia de Online.
// Valida al usuario mediante credenciales locales.
// Puede servir para controlar el estado de tiempo real de usuarios conectados en la aplicacion.
//  JWT-passport
passport.use("online", new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromExtractors([(req => req?.cookies?.token)]),
    secretOrKey: SECRET_KEY
}, async (data, done) => {
    try {
        // Extraemos el id de la data del token.
        const { user_id } = data;
        // Obtenemos el user.
        const user = await UsersManager.readById(user_id);
        // Extraemos la propiedad isOnline.
        const { isOnline } = user;
        // Si es false, respuesta.
        if (!isOnline) {
            const info = { message: "USER IS NOT ONLINE", statusCode: 401 }
            return done(null, false, info);
        }
        // Devolvemos user en el objeto req.user.
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
passport.use("signout", new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromExtractors([(req => req?.cookies?.token)]),
    secretOrKey: SECRET_KEY
}, async (data, done) => {
    try {
        const { user_id } = data;
        let user = await UsersManager.readById(user_id);
        user = await UsersManager.update(user_id, { isOnline: false });
        user = {};
        return done(null, user);
    } catch (error) {
        return done(error);
    };
}

));

export default passport;