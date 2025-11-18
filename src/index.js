import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
// import connectDB from './DB/connection.js'
import ProductRoutes from './Modules/Products/Routes/Product.routes.js'
// import routes from './Routes/index.js'

// base de datos
// connectDB()

const app = express()



    //crear un middleware
    app.use(express.json()) // permite procesar cuerpos de solicitudes
    app.use(morgan('dev')) // muestra peticiones al servidor

    const apiPath = {
        version_api_1: '/api/v1'
    }

    const originUrls = ['*']
    app.use(cors({
        origin: '*', // Permitir cualquier origen
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
    }));

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
    app.use(apiPath.version_api_1, ProductRoutes)
        // routes.forEach(route => {
        //     app.use(apiPath.version_api_1, route);
        // });

app.get('/', (req, res) => {
    res.status(200).send('API is running successfully!');
});

export default app;
