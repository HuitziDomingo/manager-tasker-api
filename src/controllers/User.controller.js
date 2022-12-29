import User from '../models/Users'
import { generateId } from '../helpers/generetId'
import { generateJWT } from '../helpers/generateJWT'
import { emailRegister, emailForgetPassWord } from '../helpers/emails'

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
        await user.save()

        //Enviar email de conformacion
        // console.log(user)
        emailRegister({
            email: user.email,
            name: user.name,
            token: user.token
        })

        return res.json({
            message:
                'Usuario creado correctamente, Revisa tu email para confirmar tu cuenta'
        })
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
        return res.status(404).json({ message: error.message })
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

export const confirmToken = async (req, res) => {
    let { token } = req.params
    let userConfirm = await User.findOne({ token })//Obteniendo usuario a atraves del token
    if (!userConfirm) {
        let error = new Error('Token no valido')
        return res.status(403).json({ message: error.message })
    }
    try {
        userConfirm.confirm = true
        userConfirm.token = ''
        await userConfirm.save()
        res.json({ message: 'Usario confirmado correctamente' })
    } catch (error) {
        console.log(error)
    }
}

export const forgetPassword = async (req, res) => {
    let { email } = req.body
    //Comprobar si usuario existe (funcion existente)
    let user = await User.findOne({ email })
    if (!user) {
        let error = new Error(`El usuario no existe`)
        return res.status(404).json({ message: error.message })
    }
    //Si el usuario existe
    try {
        user.token = generateId()
        await user.save()
        //Enviar email de nuvo password
        emailForgetPassWord({
            email: user.email,
            name: user.name,
            token: user.token
        })
        res.json({ message: 'Hemos enviado mail con las instrucciones' })
    } catch (error) {
        console.log(error)
    }
}

export const proveToken = async (req, res) => {
    let { token } = req.params
    console.log(token)
    //Buscar el token del usuario
    let validatedToken = await User.findOne({ token })
    if (validatedToken)
        res.json({ message: 'Token Valido y el usuario existe' })
    else {
        let error = new Error('Token no Valido')
        return res.status(404).json({ message: error.message })
    }
}

export const newPassword = async (req, res) => {
    let { token } = req.params
    let { password } = req.body

    let user = await User.findOne({ token })
    if (user) {
        user.password = password
        user.token = ''
        try {
            await user.save()
            res.json({ message: 'password modificado correctamente' })
        } catch (error) {
            console.log(error)
        }
    }
    else {
        let error = new Error('Token no Valido')
        return res.status(404).json({ message: error.message })
    }
}

export const profile = async (req, res) => {
    let { user } = req.body
    res.json(user)
}