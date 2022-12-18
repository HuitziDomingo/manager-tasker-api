import { Router } from 'express'
import * as Usercontroller from '../controllers/User.controller'

const router = Router()

//Auth y registro de confirmacion de usuarios.
router.get('/', Usercontroller.getUsers)
router.post('/', Usercontroller.createUser)
router.post('/login', Usercontroller.auth)
router.get('/login/:token', Usercontroller.confirmToken)
router.post('/login/forget-password', Usercontroller.forgetPassword)

export default router