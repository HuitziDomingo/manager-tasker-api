import { Router } from "express"
import * as Proyects from '../controllers/Proyect.controller'
import { checkAuth } from '../middleware/checkAuth'

const router = Router()

router.get('/', checkAuth, Proyects.getAllProyects)

router.route('/')
    .get(checkAuth, Proyects.getAllProyects)
    .post(checkAuth, Proyects.createProyect)

router.route('/:id')
    .get(checkAuth, Proyects.getProyectById)
    .put(checkAuth, Proyects.editProyect)
    .delete(checkAuth, Proyects.deleteProyect)

router.get('/taks/:id', checkAuth, Proyects.getTask)
router.post('/add-colaborator/:id', checkAuth, Proyects.addColaborator)
router.post('/delete-colaborator/:id', checkAuth, Proyects.deleteColaborator)


export default router