import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
// import connectDB from './DB/connection.js'
import routes from './Routes/index.js'
import * as dotenv from 'dotenv';
// base de datos
// connectDB()


// Solo ejecutamos dotenv.config() si NO estamos en un entorno de producción (Render ya provee las variables).
if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

const app = express()

async function expressServer() {
  
 
    //crear un middleware
    app.use(express.json()) // permite procesar cuerpos de solicitudes
    app.use(morgan('dev')) // muestra peticiones al servidor

    const apiPath = {
        version_api_1: '/api/v1'
    }

    const originUrls = ['*']

    const corsOptions = {
        origin: (origin, callback) => {
            if(!origin || origenesPermitidos.includes(originUrls)) {
                callback(null, true)
            } else { 
                callback(new Error('Cliente no permitido'))
            }
        },
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
    }

    app.use(cors(corsOptions))
    //puerto
    const PORT = process.env.PORT || 5000

    //rutas
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin: *');
        res.header('Access-Control-Allow-Credentials: true');
        res.header('Access-Control-Allow-Headers', 'Authorization,authorization, X-API-KEY,Access-Control-Allow-Origin,Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.header('Allow', 'GET, POST, OPTIONS');
        if (req.method === 'OPTIONS') res.sendStatus(200);
        else next();
    });
    app.use(apiPath.version_api_1, routes)


    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    })

}


export default expressServer
