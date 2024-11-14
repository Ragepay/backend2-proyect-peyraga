import "dotenv/config.js"
import express from 'express';
import morgan from 'morgan';
import pathHandler from "./src/middlewares/pathHandler.mid.js";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import indexRouter from "./src/routers/index.router.js";
import dbConnect from "./src/utils/dbConnect.util.js";

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

// Middleware de routers.
app.use(indexRouter);

// Middleware de manejo de errores.
app.use(errorHandler);
app.use(pathHandler); // Debe ser el ultimo, porque recibe rutas no existentes.
//------------------------------------------------------------------------------------