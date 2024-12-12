import productsApiRouter from "./products.api.js";
import cookieApiRouter from "./cookies.api.js";
import sessionApiRouter from "./sessions.api.js";
import usersApiRouter from "./users.api.js";
import cartsApiRouter from "./carts.api.js";
import CustomRouter from "../../utils/CustomRouter.util.js";
//import sum from "../../utils/process.util.js";
import { fork } from "child_process"

class ApiRouter extends CustomRouter {
    constructor() {
        super(/*No necesito pasarle paramaetros a la clas de CustomRouter */);
        this.init();
    }

    init = () => {
        this.use("/products", ["PUBLIC"], productsApiRouter);
        this.use("/sessions", ["PUBLIC"], sessionApiRouter);
        this.use("/users", ["PUBLIC"], usersApiRouter);
        this.use("/carts", ["PUBLIC"], cartsApiRouter);
        this.use("/cookies", ["ADMIN"], cookieApiRouter);
        this.read("/sum", ["PUBLIC"], (req, res) => {
            //const response = sum();
            const child = fork("./src/utils/process.util.js")
            child.send("start");
            child.on("message", (response) => {
                const message = "SUMATORIA OBTENIDA.";
                return res.json200(response, message)
            });
        });
    }
}

let apiRouter = new ApiRouter();
export default apiRouter.getRouter();

/*
//import { Router } from "express";
const apiRouter = Router();

apiRouter.use("/products", productsApiRouter);
apiRouter.use("/cookies", cookieApiRouter );
apiRouter.use("/sessions", sessionApiRouter);
apiRouter.use("/users", usersApiRouter);
*/