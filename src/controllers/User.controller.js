import User from '../models/Users'
import { generateId } from '../helpers/generetId'
import { generateJWT } from '../helpers/generateJWT'

export const getUsers = (req, res) => {
    res.json({ message: 'obtener usuarios' })
}

export const createUser = async (req, res) => {
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
    if (!user) {
        let error = new Error(`El usuario no existe`)
        return res.status(400).json({ message: error.message })
    }

    // Comprobar si el usuario esta confirmado
    if (!user.confirm) {
        let error = new Error(`Tu cuenta no ha sido confirmada`)
        return res.status(403).json({ message: error.message })
    }

    // Comprobar su password
    if (await user.validatePassword(password))
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateJWT(user._id)
        })
    else {
        let error = new Error('password incorrecto')
        return res.status(403).json({ message: error.message })
    }

}