# back2-70280
 Carpeta: Backend2-Practica
# Descripción
Este proyecto es una aplicación backend basada en Node.js con una arquitectura modular y escalable. La aplicación utiliza Express para la gestión de rutas, Mongoose para la conexión a MongoDB, y Handlebars como motor de plantillas para renderizar vistas. Además, incluye funcionalidades de autenticación, manejo de sesiones, y un sistema de gestión de datos con distintas estrategias de almacenamiento.

#  principales
Autenticación y manejo de usuarios: Implementación de autenticación con Passport, soporte para estrategias locales y OAuth2 con Google.
Rutas y vistas: Uso de rutas modulares y vistas renderizadas con Handlebars.
Gestión de datos: Modelos para usuarios, productos y carritos, integrados con MongoDB mediante Mongoose.
Seguridad: Manejo de contraseñas con bcrypt y protección de rutas con middlewares personalizados.
Manejo de sesiones: Uso de sesiones con express-session y almacenamiento en MongoDB.
Configuración flexible: Uso de dotenv para variables de entorno.
Desarrollo ágil: Integración de nodemon para recarga automática durante el desarrollo.
# Estructura del proyecto

backend2-practica/
│
├── public/                 # Archivos públicos (CSS, imágenes, JS frontend)
│   ├── img/                # Imágenes
│   └── js/                 # Scripts JavaScript frontend
│       ├── home.js
│       ├── homeApp.js
│       ├── index.js
│       ├── login.js
│       └── register.js
│
├── src/                    # Código fuente principal
│   ├── data/               # Datos temporales o memoria simulada
│   ├── memory/             # Archivos relacionados con memoria
│   ├── mongo/              # Archivos relacionados con MongoDB
│   ├── managers/           # Capas de acceso a datos (DAOs)
│   │   ├── carts.manager.js
│   │   ├── managers.js
│   │   ├── products.manager.js
│   │   └── users.manager.js
│   ├── models/             # Modelos de Mongoose
│   │   ├── cart.model.js
│   │   ├── product.model.js
│   │   └── user.model.js
│   ├── middlewares/        # Middlewares personalizados
│   ├── routers/            # Rutas modulares
│   │   ├── carts.api.js
│   │   ├── cookies.api.js
│   │   ├── index.api.js
│   │   ├── products.api.js
│   │   ├── sessions.api.js
│   │   └── users.api.js
│   ├── utils/              # Utilidades reutilizables
│   │   ├── CustomRouter.util.js
│   │   ├── dbConnections.js
│   │   ├── hash.util.js
│   │   ├── pathHandler.util.js
│   │   └── token.util.js
│   └── views/              # Vistas renderizadas con Handlebars
│       ├── layouts/        # Plantillas base
│       └── templates/      # Plantillas específicas por ruta
│
├── .env                    # Variables de entorno
├── .gitignore              # Archivos y carpetas ignorados por Git
├── index.js                # Punto de entrada del servidor
├── package.json            # Dependencias y scripts del proyecto
└── README.md               # Documentación del proyecto

# Dependencias
El proyecto utiliza las siguientes dependencias:

Autenticación y seguridad: passport, passport-google-oauth2, passport-local, passport-jwt, bcrypt, jsonwebtoken
Gestión de sesiones: express-session, connect-mongo, cookie-parser, session-file-store
Base de datos: mongoose
Backend: express, axios, dotenv, morgan
Frontend y vistas: express-handlebars
Herramientas de desarrollo: nodemon

# Instalación
Clona el repositorio:

1)
git clone <https://github.com/Ragepay/backend2-proyect-peyraga.git>
cd backend2-practica
Instala las dependencias:

2)
npm install
Configura el archivo .env con las variables necesarias:

3)
.env
PORT=
MONGO_LINK=
SECRET_KEY=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
REDIRECT_URI="http://localhost:9000/api/sessions/auth/google/cb"
TOKEN_URL ="https://oauth2.googleapis.com/token"

4)
Inicia el servidor:

npm run dev

#Uso
El servidor incluye las siguientes rutas principales:

# Usuarios: /api/users
Productos: /api/products
Carritos: /api/carts
Sesiones: /api/sessions
Cookies: /api/cookies

# Próximos pasos
Finalizar la funcionalidad pendiente en algunas rutas.
Pulir detalles en el frontend.
Implementar el despliegue en una plataforma como Heroku, Vercel o Render.

# Contribuciones
Si tienes sugerencias o encuentras errores, ¡no dudes en crear un issue o enviar un pull request!