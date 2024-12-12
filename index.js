import envUtil from './src/utils/env.util.js';
import express from 'express';
import morgan from 'morgan';
import pathHandler from "./src/middlewares/pathHandler.mid.js";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import indexRouter from "./src/routers/index.router.js";
import dbConnect from "./src/utils/dbConnect.util.js";
import cookieParser from "cookie-parser";
import session from "express-session";
//import sessionFileStore from 'session-file-store';
import MongoStore from "connect-mongo";
import { __dirname } from "./utils.js";
import handlebars from 'express-handlebars';
import argsUtil from "./src/utils/args.util.js";

/* INICIALIZACION DE SERVER BASICO */
//------------------------------------------------------------------------------------
// Iniciacion del servidor
const app = express();
// Varioable env PORT.
const PORT = envUtil.PORT;
// Funcion ready server y BBDD Mongo.
const ready = () => {
    console.log("Server ready on port: " + PORT);
    console.log("Server on mode: " + argsUtil.env)
    if (argsUtil.persistence === "mongo") {
        dbConnect();
    }
}
// Funcion Listen del servidor.
app.listen(PORT, ready);
//------------------------------------------------------------------------------------

/*          MIDDLEWARES            */
//------------------------------------------------------------------------------------
//  Handlebars.
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/src/views');
app.set('view engine', 'handlebars');

// Middleware incorporados.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
// Middleware de Terceros.
// Muestra por consola un registro de las solicitudes HTTPs (GET, POST, PUT, DELETE).
app.use(morgan("dev"));
// Utilizada para utilizar cookies, y le podes dar seguridad con signed:true. Configuracion de cookies.
app.use(cookieParser(envUtil.SECRET_KEY));

/*
// Utilizado para crear sessiones, almacena el id en una cookie firmada. Configuracion de Sessions en cookie.
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: true, // Permite la reconeccion en caso de desconectarse.
    saveUninitialized: true, // Crear una session Activa, pero sin inicializar.
    cookie: { maxAge: 60000 * 60 },
}));
*/

/*
// Utilizando File Storage, para persistencia de las session en archivos dentro del Server. Configuracion de sessions en File Store.
//------------------------------------------------------------------------------------
const FileStore = sessionFileStore(session);
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: true,
    saveUninitialized: true,
    store: new FileStore({ path: "./src/data/fs/sessions", ttl: 60, retries: 3 }),
}));
//------------------------------------------------------------------------------------
*/

// Configuracion de session con Mongo Storage.
app.use(session({
    secret: envUtil.SECRET_KEY,
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({ mongoUrl: envUtil.MONGO_LINK, ttl: 60 * 60 * 24 }), // Default 14 dias.
}));

// Middleware de routers.
app.use(indexRouter);

// Middleware de manejo de errores.
app.use(errorHandler);
app.use(pathHandler); // Debe ser el ultimo, porque recibe rutas no existentes.
//------------------------------------------------------------------------------------

//console.log(argsUtil);
//console.log(process.pid);
//console.log(process.argv);
//console.log(process.argv[2]);
/*
.env.dev
PORT=
MONGO_LINK=
SECRET_KEY=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
REDIRECT_URI=
TOKEN_URL=
*/