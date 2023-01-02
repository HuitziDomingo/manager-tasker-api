import { Router } from "express"
import * as Proyects from '../controllers/Proyect.controller'
const router = Router()

router.get('/proyects', Proyects.getAll)

export default router