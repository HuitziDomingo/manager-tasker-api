import Proyect from "../models/Proyects"

export const getAllProyects = async (req, res) => {
    res.send('obteniendo proyectos de la BD')
}

export const createProyect = async (req, res) => {
    let proyect = new Proyect(req.body)
    proyect.creator = req.body._id
    console.log(req.body._id)
    try {
        let proyectSaved = await proyect.save()
        res.json(proyectSaved)
        console.log(proyectSaved.creator)
    } catch (error) {
        console.log(error)
    }
}

export const getProyectById = async (req, res) => { }
export const editProyect = async (req, res) => { }
export const deleteProyect = async (req, res) => { }

export const addColaborator = async (req, res) => { }
export const deleteColaborator = async (req, res) => { }
export const getTask = async (req, res) => { }