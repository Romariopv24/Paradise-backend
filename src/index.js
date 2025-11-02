import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
// Asegúrate de que la ruta sea correcta desde src/
// import connectDB from './DB/connection.js' 
import routes from './Routes/index.js' 

const app = express()

// --- Middlewares de inicialización ---
// 1. Logs de peticiones
app.use(morgan('dev')) 

// 2. CORS: Versión simple que permite todo para evitar errores de origen
// Puedes refinar esto más tarde cuando el despliegue funcione.
app.use(cors()) 

// 3. Procesamiento de JSON
app.use(express.json()) 


const apiPath = {
    // Definimos el prefijo de la API
    version_api_1: '/api/v1' 
}

// *** IMPORTANTE: Se eliminó el bloque de 'res.header' y 'corsOptions' con errores
// y se dejó solo app.use(cors()) para máxima compatibilidad con Vercel.

// Si deseas una ruta de prueba rápida para verificar que el servidor funcione:
app.get('/api/test', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'API Functioning Correctly on Vercel' });
});


// Rutas
app.use(apiPath.version_api_1, routes)


// --- CONFIGURACIÓN CRÍTICA PARA VERCEL ---
// 1. Se elimina la llamada a app.listen().
// 2. Se exporta la instancia de la aplicación directamente.
export default app
