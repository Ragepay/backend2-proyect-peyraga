# Proyecto Backend - Práctica

## Descripción
Este proyecto es una aplicación backend construida con Node.js y Express. Integra múltiples funcionalidades como autenticación con Passport, manejo de datos con MongoDB y Mongoose, sesiones y seguridad con JSON Web Tokens y bcrypt. Está diseñado para manejar carritos, productos y usuarios, además de incluir una interfaz de usuario básica utilizando Handlebars.

## Estructura del Proyecto
- **public/**: Archivos estáticos como imágenes y estilos.
- **src/**: Contiene la lógica principal del proyecto.
  - **data/**: Datos estáticos o temporales utilizados por la aplicación.
    - **managers/**: Clases o módulos para manejar datos de productos, usuarios y carritos.
        - `carts.manager.js`
        - `products.manager.js`
        - `users.manager.js`
    - **models/**: Modelos de Mongoose para las colecciones.
        - `cart.model.js`
        - `product.model.js`
        - `user.model.js`
  - **middlewares/**: Middlewares personalizados para la aplicación.
    - `createHash.mid.js`
    - `passportCB.mid.js`
    - `validateUserData.mid.js`
  - **routers/**: Rutas API organizadas por recursos.
    - **api/**: Rutas principales.
        - `carts.api.js`
        - `cookies.api.js`
        - `products.api.js`
        - `sessions.api.js`
        - `users.api.js`
    - **views/**: Plantillas Handlebars.
        - **layouts/**
        - `main.handlebars`: Layout principal.
        - **pages/**: Plantillas individuales.
        - `home.handlebars`
        - `login.handlebars`
        - `register.handlebars`
  - **utils/**: Utilidades y funciones comunes.
    - `CustomRouter.util.js`
    - `dbConnect.util.js`
    - `hash.util.js`
    - `token.util.js`

## Dependencias
El proyecto utiliza las siguientes dependencias principales:
- **Express**: Framework para construir el servidor.
- **Mongoose**: Modelado de datos para MongoDB.
- **Passport**: Autenticación con estrategias Local, JWT y Google OAuth2.
- **Bcrypt**: Para el cifrado de contraseñas.
- **JWT**: Seguridad basada en tokens.
- **Handlebars**: Motor de plantillas para renderizar vistas.
- **Dotenv**: Manejo de variables de entorno.
- **Morgan**: Logger HTTP para desarrollo.
- **Axios**: Cliente HTTP para consumir APIs.
- **Commander**: Para la manipulaicon de Argumentos.
- **nodemailer**: Para enviar e-mails.

## Instalación
1. Clona este repositorio:
   ```bash
   git clone <https://github.com/Ragepay/backend2-proyect-peyraga.git>
   cd backend-practica

2. Instala los modules
    npm install
    Configura el archivo .env con las variables necesarias:

3. Crea el archivo .env
    PORT=<puerto>
    MONGO_LINK=<tu_mongo_link>
    SECRET_KEY=<clave_secreta_para_hash_y_otras_cosas>
    GOOGLE_CLIENT_ID=<GOOGLE_CLIENT_ID>
    GOOGLE_CLIENT_SECRET=<GOOGLE_CLIENT_SECRET>
    REDIRECT_URI="http://localhost:9000/api/sessions/auth/google/cb"
    TOKEN_URL ="https://oauth2.googleapis.com/token"

4. Inicia el servidor:
    npm run dev (dev)
    npm start (prod)

# Uso
El servidor incluye las siguientes rutas principales:
- **Usuarios**: /api/users
- **Productos**: /api/products
- **Carritos**: /api/carts
- **Sesiones**: /api/sessions
- **Cookies**: /api/cookies

# Próximos pasos
Finalizar la funcionalidad pendiente en algunas rutas.
Pulir detalles en el frontend.
Implementar el despliegue en una plataforma como Heroku, Vercel o Render.
