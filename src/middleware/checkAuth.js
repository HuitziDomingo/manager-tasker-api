import jwt from 'jsonwebtoken'
import User from '../models/Users'

export const checkAuth = async (req, res, next) => {
    let token

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1]
            let decoded = jwt.verify(token, process.env.JWT)
            req.user = await User.findById(decoded.id).select(
                '-password -confirm -token -createdAt -updatedAt -__v'
            )
            return next()
            
        } catch (error) {
            return res.status(404).json({ message: 'Hubo error: ' + error.message })
        }
    }

    if (!token) {
        let error = new Error('Token no valido')
        return res.status(401).json({ message: error.message })
    }

    next()
}