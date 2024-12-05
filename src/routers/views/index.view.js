import { Router } from "express";

const viewsRouter = Router();


viewsRouter.get('/', (req, res) => {
    res.render('home', {
    });
});

viewsRouter.get('/login', (req, res) => {
    res.render('login', {
    });
});

viewsRouter.get('/register', (req, res) => {
    res.render('register', {
    });  
}); 

viewsRouter.get('/homeApp', (req, res) => {
    res.render('homeApp', {
    });  
}); 

/*
viewsRouter.use("/carts");
viewsRouter.use("/products");
viewsRouter.use("/users");
*/
export default viewsRouter;


