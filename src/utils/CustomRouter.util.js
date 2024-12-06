import { Router } from "express";

class CustomRouter {
    constructor() {
        this._router = Router();
    }

    getRouter = () => this._router;

    // Esta funcion depende de todos los middlewares que necesite ejecutar.
    // mapeamos los middlewares para que se ejecuten cada uno con req, res, next
    _applyCb = (callbacks) => callbacks.map((cb) => async (req, res, next) => {
        try {
            await cb(req, res, next);
        } catch (error) {
            return next(error)
        }
    });

    create = (path, ...cbs) => this._router.post(path, this._applyCb(cbs));
    read = (path, ...cbs) => this._router.get(path, this._applyCb(cbs));
    update = (path, ...cbs) => this._router.put(path, this._applyCb(cbs));
    destroy = (path, ...cbs) => this._router.delete(path, this._applyCb(cbs));
    use = (path, ...cbs) => this._router.use(path, this._applyCb(cbs));

};

export default CustomRouter;