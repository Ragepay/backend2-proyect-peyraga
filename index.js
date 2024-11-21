import "dotenv/config.js"
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


/* INICIALIZACION DE SERVER BASICO */
//------------------------------------------------------------------------------------
// Iniciacion del servidor
const app = express();
// Varioable env PORT.
const PORT = process.env.PORT;
// Funcion ready server y BBDD Mongo.
const ready = () => {
    console.log("Server ready on port: " + PORT);
    dbConnect();
}
// Funcion Listen del servidor.
app.listen(PORT, ready);
//------------------------------------------------------------------------------------

/*          MIDDLEWARES            */
//------------------------------------------------------------------------------------

// Middleware incorporados.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware de Terceros.
// Muestra por consola un registro de las solicitudes HTTPs (GET, POST, PUT, DELETE).
app.use(morgan("dev"));
// Utilizada para utilizar cookies, y le podes dar seguridad con signed:true. Configuracion de cookies.
app.use(cookieParser(process.env.SECRET_KEY));

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
    secret: process.env.SECRET_KEY,
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({ mongoUrl: process.env.MONGO_LINK, ttl: 60 * 60 * 24 }),
}));

// Middleware de routers.
app.use(indexRouter);

// Middleware de manejo de errores.
app.use(errorHandler);
app.use(pathHandler); // Debe ser el ultimo, porque recibe rutas no existentes.
//------------------------------------------------------------------------------------