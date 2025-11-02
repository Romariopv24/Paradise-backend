import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
// Asegúrate de que la ruta sea correcta desde src/
// import connectDB from './DB/connection.js' 
import routes from './Routes/index.js' 

// base de datos
// connectDB()

const app = express()

// Los middleware se aplican directamente a la instancia 'app'
app.use(express.json()) // permite procesar cuerpos de solicitudes
app.use(morgan('dev')) // muestra peticiones al servidor

const apiPath = {
    version_api_1: '/api/v1'
}

// CORRECCIÓN CRÍTICA 1: La variable 'origenesPermitidos' no está definida.
// Si deseas permitir TODO (lo cual es común para APIs de desarrollo), usa simplemente:
app.use(cors());

/*
// Si necesitas una configuración más compleja, debes definir la lista y corregir el error:
const originUrls = ['*'] // Definida, pero esto no funciona bien con la lógica del callback
const origenesPermitidos = ['https://tufrontend.vercel.app', 'http://localhost:3000'];

const corsOptions = {
    origin: (origin, callback) => {
        // En Vercel, a veces 'origin' es undefined para peticiones directas.
        if(!origin || origenesPermitidos.includes(origin) || origenesPermitidos.includes('*')) {
            callback(null, true)
        } else { 
            callback(new Error('Cliente no permitido'))
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}
app.use(cors(corsOptions))
*/

// CORRECCIÓN CRÍTICA 2: La configuración manual de headers no es necesaria si usas `cors()`.
// Además, la línea 'Access-Control-Allow-Origin: *' debe corregirse a 'Access-Control-Allow-Origin'.
// Si usas el middleware `cors()`, puedes quitar este bloque:
/*
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Corregido: sin ':'
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Authorization,authorization, X-API-KEY,Access-Control-Allow-Origin,Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Allow', 'GET, POST, OPTIONS');
    next();
});
*/

// Rutas
app.use(apiPath.version_api_1, routes)


// CORRECCIÓN CRÍTICA 3: Elimina la función `expressServer` y el `app.listen()`.
// Vercel NO necesita el puerto.

// export default expressServer // <-- ELIMINADO

// EXPORTA la instancia de la aplicación directamente
export default app
