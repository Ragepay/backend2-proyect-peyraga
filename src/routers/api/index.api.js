//import { Router } from "express";
import productsApiRouter from "./products.api.js";
import cookieApiRouter from "./cookies.api.js";
import sessionApiRouter from "./sessions.api.js";
import usersApiRouter from "./users.api.js";
import CustomRouter from "../../utils/CustomRouter.util.js";
import cartsApiRouter from "./carts.api.js";





class ApiRouter extends CustomRouter {
    constructor() {
        super(/*No necesito pasarle paramaetros a la clas de CustomRouter */);
        this.init();
    }

    init = () => {
        this.use("/products", productsApiRouter);
        this.use("/cookies", cookieApiRouter);
        this.use("/sessions", sessionApiRouter);
        this.use("/users", usersApiRouter);
        this.use("/carts", cartsApiRouter);
    }
}

let apiRouter = new ApiRouter();
apiRouter = apiRouter.getRouter();

/*
const apiRouter = Router();

apiRouter.use("/products", productsApiRouter);
apiRouter.use("/cookies", cookieApiRouter );
apiRouter.use("/sessions", sessionApiRouter);
apiRouter.use("/users", usersApiRouter);

*/

export default apiRouter;