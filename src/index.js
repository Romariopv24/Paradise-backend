import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
// import connectDB from './DB/connection.js' 

// --- TEMPORALMENTE COMENTADO: Descomenta esto solo después de que /api/test funcione.
// import routes from './Routes/index.js' 

const app = express()

// base de datos
// connectDB() // Si descomentaste esto, revisa las variables de entorno en Vercel

// --- Middlewares de inicialización ---
app.use(morgan('dev')) 
app.use(express.json()) 
app.use(cors()) 

const apiPath = {
    version_api_1: '/api/v1'
}

// *** ENDPOINT DE PRUEBA CRÍTICO ***
// Este endpoint debe funcionar si el servidor inicia.
app.get('/api/test', (req, res) => {
    // Si la aplicación arranca, esta será la respuesta.
    res.status(200).json({ status: 'ok', message: 'API Functioning Correctly on Vercel' });
});


// Rutas
// --- TEMPORALMENTE COMENTADO: Descomenta esto solo después de que /api/test funcione.
// app.use(apiPath.version_api_1, routes)


// --- CONFIGURACIÓN CRÍTICA PARA VERCEL ---
// Exportamos la instancia de la aplicación directamente
export default app
