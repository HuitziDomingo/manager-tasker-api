import User from '../models/Users'
import { generateId } from '../helpers/generetId'

export const getUsers = (req, res, next) => {
    res.json({ message: 'obtener usuarios' })
    next()
}

export const createUser = async (req, res, next) => {
    let { email } = req.body
    let userExists = await User.findOne({ email })

    if (userExists) {
        let error = new Error(`El usuario ${req.body.email} ya existe`)
        return res.status(400).json({ message: error.message })
    }

    try {
        let user = new User(req.body)
        user.token = generateId()
        let savedUser = await user.save()
        return res.send(savedUser)
    } catch (error) {
        console.log(`Error en el usuario: ${error}`)
    }

}

export const auth = async (req, res) => {
    let { email, password } = req.body
    // Comprobar si el uduario existe
    let user = await User.findOne({ email })
    console.log(user)
    // console.log('fsfasdfsdf')
    
    // Comprobar si el uduario esta confirmado

    // Comprobar su password

}