import app from './app'
import mongoose from 'mongoose'
import { config as dotenv } from 'dotenv'

dotenv()

app.listen(4000, console.log('Bienvenido a Express'))

mongoose.set('strictQuery', true)
mongoose.connect(`${process.env.DB_HOST}/${process.env.DB_NAME}`).then(() => console.log('Conexion exitosa')).catch(err => console.log('Error: ' + err))


