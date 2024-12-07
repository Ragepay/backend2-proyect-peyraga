import { Router } from "express";

class CustomRouter {
    constructor() {
        this._router = Router();
    }
    // Inciializarlos como Router() de express.
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

    // Metodo de respuestas del servidor.
    responses = (req, res, next) => {
        res.json200 = (response, message) => res.status(200).json({ response, message });
        res.json201 = (response, message) => res.status(201).json({ response, message });
        res.json400 = (message) => res.status(400).json({ error: message });
        res.json401 = () => res.status(401).json({ error: "Bad Auth!" });
        res.json403 = () => res.status(403).json({ error: "Forbidden!" });
        res.json404 = () => res.status(404).json({ error: "Not found!" });
        return next();
    };

    // Metodos que son verbos de http. Y el use para middlewares.
    create = (path, ...cbs) => this._router.post(path, this.responses, this._applyCb(cbs));
    read = (path, ...cbs) => this._router.get(path, this.responses, this._applyCb(cbs));
    update = (path, ...cbs) => this._router.put(path, this.responses, this._applyCb(cbs));
    destroy = (path, ...cbs) => this._router.delete(path, this.responses, this._applyCb(cbs));
    use = (path, ...cbs) => this._router.use(path, this.responses, this._applyCb(cbs));

};

export default CustomRouter;