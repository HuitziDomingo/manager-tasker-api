import express from "express"
import pkg from '../package.json'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'

import users from './routes/users.routes'

const app = express()

//Middelwares
app.use(cors())
app.use(express.json())// Procesar elementos JSON 
app.use(morgan('dev'))// Ver las peticiones en consola
app.use(helmet())

app.set('pkg', pkg)


app.get('/', (req, res) => {
    res.json({
        author: app.get('pkg').author,
        name: app.get('pkg').name,
        description: app.get('pkg').description,
        version: app.get('pkg').version,
    })
})


app.use('/api/users', users)

export default app