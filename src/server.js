import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
// import connectDB from './DB/connection.js'
import routes from './Routes/index.js'

// base de datos
// connectDB()

const app = express()

async function expressServer() {
  
  app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swagger_output, {
    customSiteTitle: "Coally"
  }))
  app.use(cookieParser())
  app.use(express.json())
  app.use(morgan('dev'))

    const apiPath = {
      version_api_1: '/api/v1'
  }

  const originUrls = ['*']

  const corsOptions = {
        // origin: originUrls,
        origin: ['http://localhost:5173', '*'],
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    }

    app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin: *');
      res.header('Access-Control-Allow-Credentials: true');
      res.header('Access-Control-Allow-Headers', 'Authorization,authorization, X-API-KEY,Access-Control-Allow-Origin,Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
      res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
      res.header('Allow', 'GET, POST, OPTIONS');

      next();
  });


    app.use(cors(corsOptions))

  const PORT = process.env.PORT 

  app.use(apiPath.version_api_1, routes)

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  })

}


export default expressServer
